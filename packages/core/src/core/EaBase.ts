import variable from "@easy-component-ui/themes/variables.scss?inline";
import type { EaElement } from "../types/index";
import { createBEM } from "@utils/bem";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { GlobalHTMLElement } from "@utils/env";
import { reportError } from "@utils/diagnostics";

export { createBEM };

/**
 * 组件生命周期状态
 * `construct` / `styling` / `template` 属 `mounting` 的内部阶段，不对外暴露
 */
export type EaLifecycleState = "idle" | "mounting" | "ready" | "disconnected";

/** 单个属性的变更记录 */
export interface EaPropertyChange {
  /** 变更前的值 */
  readonly oldValue: unknown;
  /** 变更后的值 */
  readonly newValue: unknown;
}

/** 一轮更新合并后的变更表，键为属性名 */
export type EaChangedMap = ReadonlyMap<string, EaPropertyChange>;

/** 当前存在待完成更新的组件 */
const pendingUpdates = new Set<EaBase>();

/** 是否仍有组件处于待更新状态 */
export function hasPendingUpdates(): boolean {
  return pendingUpdates.size > 0;
}

/**
 * 等待当前所有组件完成更新
 *
 * 属性回调可能触发子组件的新一轮更新，因此每轮排空后再检查一次；
 * 先让出一个微任务，避免在 `connectedCallback` 之前调用时直接返回
 */
export async function waitForPendingUpdates(): Promise<void> {
  await Promise.resolve();

  for (let round = 0; round < 10; round += 1) {
    if (pendingUpdates.size > 0) {
      await Promise.all([...pendingUpdates].map(el => el.updateComplete));
    }

    await Promise.resolve();
    await Promise.resolve();

    if (pendingUpdates.size === 0) return;
  }
}

/**
 * EA UI 组件基类
 * 提供基础生命周期、事件系统、本地化支持
 */
@CustomElement("ea-base", { styles: [variable], autoDefine: false })
export default class EaBase extends GlobalHTMLElement {
  // ==================== 属性定义 ====================

  private _isInitialized: boolean = false;

  /** 生命周期状态，对外只读 */
  private _state: EaLifecycleState = "idle";

  /** 就绪门：打开前属性回调挂起 */
  private _readyGate: Promise<void> | null = null;
  private _resolveReady: (() => void) | null = null;

  private _pendingUpdateCount: number = 0;
  private _pendingUpdatePromise: Promise<void> | null = null;
  private _pendingUpdateResolve: (() => void) | null = null;

  /** 本轮待处理的属性变更 */
  private _changed: Map<string, EaPropertyChange> | null = null;
  private _updateScheduled = false;

  /** 由 `@CustomElement` 注入：按声明同步 a11y 与 forward */
  $syncDeclared?: () => void;

  /**
   * 当前生命周期状态
   * 状态不承担就绪语义，“可回调”的时机由就绪门（`$mounted` 完成）决定
   */
  get lifecycleState(): EaLifecycleState {
    return this._state;
  }

  /**
   * 更新完成信号
   * 等待组件渲染（$mount/$mounted）与属性 observer 执行完成
   * @returns 更新完成 Promise
   */
  get updateComplete(): Promise<void> {
    return this._pendingUpdatePromise ?? Promise.resolve();
  }

  /**
   * 语言设置
   * @default "en-US"
   */
  @attribute({
    type: String,
    observer(this: EaBase, locale: string) {
      this.$updateLocalization(locale);
    },
  })
  locale: string = "en-US";

  // ==================== 构造函数 ====================

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._isInitialized = false;
    this._resetReadyGate();
  }

  // ==================== 生命周期钩子 ====================

  /**
   * 首次连接时进入挂载流程
   * 挂载失败也要放行就绪门，否则属性回调会永久挂起
   */
  connectedCallback(): void {
    if (this._isInitialized) return;

    const tabindexAttr = this.getAttribute("tabindex");
    if (tabindexAttr !== null) {
      this.tabIndex = Number(tabindexAttr);
    }

    if (this._state === "disconnected") this._resetReadyGate();
    this._state = "mounting";
    this._beginUpdate();

    queueMicrotask(async () => {
      if (!this.isConnected) {
        this._openReadyGate();
        this._endUpdate();
        return;
      }

      try {
        const mountResult = this.$mount() as unknown as
          Promise<void> | undefined;

        this._isInitialized = true;

        await mountResult;
        await (this.$mounted() as unknown as Promise<void> | undefined);

        this._state = "ready";
        this._openReadyGate();
      } catch (error) {
        this._state = "ready";
        this._openReadyGate();
        reportError("mount", error, this);
      } finally {
        this._endUpdate();
      }
    });
  }

  disconnectedCallback(): void {
    this.$beforeUnmount?.();
    this.emit("beforeUnmount", { detail: this });

    this.$unmounted?.();
    this.emit("unmounted", { detail: this });

    this._isInitialized = false;
    this._state = "disconnected";
    this._openReadyGate();
  }

  async attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): Promise<void> {
    await this._waitUntilReady();

    this.requestUpdate(name, oldVal, newVal);
  }

  // ==================== 就绪门 ====================

  /**
   * 等待挂载就绪
   *
   * 先让出一个微任务，确保同一同步批次内的 `connectedCallback`
   * 已经把状态切到 `mounting`（否则“连接前到达”的回调会提前放行）
   */
  private async _waitUntilReady(): Promise<void> {
    if (this._state === "ready" || this._state === "disconnected") return;

    if (this._state === "idle") {
      await this._readyGate;
      return;
    }

    while (this._state === "mounting") {
      await this._readyGate;
    }
  }

  /** 重建就绪门；门打开前属性回调挂起 */
  private _resetReadyGate(): void {
    this._readyGate = new Promise<void>(resolve => {
      this._resolveReady = resolve;
    });
  }

  /** 打开就绪门；可重复调用 */
  private _openReadyGate(): void {
    const resolve = this._resolveReady;
    this._resolveReady = null;
    resolve?.();
  }

  // ==================== 更新调度 ====================

  /**
   * 登记一次属性变更
   * 同一轮内的多次变更合并为一次 `performUpdate`
   */
  requestUpdate(name: string, oldValue: unknown, newValue: unknown): void {
    if (!this._changed) this._changed = new Map();

    const previous = this._changed.get(name);
    this._changed.set(name, {
      oldValue: previous ? previous.oldValue : oldValue,
      newValue,
    });

    if (this._updateScheduled) return;

    this._updateScheduled = true;
    this._beginUpdate();

    queueMicrotask(() => {
      void this.performUpdate();
    });
  }

  /** 执行一轮更新：`$beforeUpdate` → 声明式同步 → `$updated` */
  async performUpdate(): Promise<void> {
    this._updateScheduled = false;

    const changed: EaChangedMap = this._changed ?? new Map();
    this._changed = null;

    try {
      this.$beforeUpdate(changed);
      this.$syncDeclared?.();
      this.$updated(changed);
    } finally {
      this._endUpdate();
    }
  }

  // ==================== 更新信号 ====================

  /** 标记一次更新开始 */
  _beginUpdate(): void {
    this._pendingUpdateCount += 1;
    pendingUpdates.add(this);

    if (!this._pendingUpdatePromise) {
      this._pendingUpdatePromise = new Promise<void>(resolve => {
        this._pendingUpdateResolve = resolve;
      });
    }
  }

  /** 标记一次更新结束，全部完成后触发 updateComplete */
  _endUpdate(): void {
    if (this._pendingUpdateCount > 0) this._pendingUpdateCount -= 1;

    if (this._pendingUpdateCount === 0 && this._pendingUpdateResolve) {
      const resolve = this._pendingUpdateResolve;
      this._pendingUpdatePromise = null;
      this._pendingUpdateResolve = null;
      pendingUpdates.delete(this);
      resolve();
    }
  }

  // ==================== 子类可覆盖方法 ====================

  /**
   * 更新组件语言
   * @param locale 语言代码
   */
  $updateLocalization(_locale: string): void {}

  /**
   * 组件模板渲染
   * @returns HTML 模板字符串
   */
  html(): string {
    return "";
  }

  /**
   * 组件挂载时调用
   */
  $mount(): void {}

  /**
   * 组件挂载完成后调用
   */
  $mounted(): void {}

  /** 组件销毁前调用 */
  $beforeUnmount(): void {}

  /** 组件销毁后调用 */
  $unmounted(): void {}

  /**
   * 组件更新前调用
   * @param changed 本轮合并后的属性变更
   */
  $beforeUpdate(_changed: EaChangedMap): void {}

  /**
   * 组件更新后调用
   * @param changed 本轮合并后的属性变更
   */
  $updated(_changed: EaChangedMap): void {}

  // ==================== 事件系统 ====================

  /**
   * 触发自定义事件
   * @param eventName 事件名
   * @param options 事件选项
   */
  emit(eventName: string, options?: CustomEventInit): boolean {
    return this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        cancelable: false,
        ...options,
      })
    );
  }

  // ==================== 焦点管理 ====================

  /**
   * 获取可聚焦元素列表
   * @param scope 查询范围：'shadow' 仅 Shadow DOM，'light' 仅 Light DOM，'all' 两者
   * @returns 可聚焦的 HTMLElement 数组
   */
  $getFocusableElements(
    scope: "shadow" | "light" | "all" = "shadow"
  ): GlobalHTMLElement[] {
    const selector =
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const shadowFocusable = Array.from(
      this.shadowRoot?.querySelectorAll(selector) ?? []
    ) as GlobalHTMLElement[];
    if (scope === "shadow") return shadowFocusable;

    const lightFocusable = Array.from(
      this.querySelectorAll(selector)
    ) as GlobalHTMLElement[];
    if (scope === "light") return lightFocusable;

    return [...shadowFocusable, ...lightFocusable];
  }

  /**
   * 聚焦到第一个可聚焦元素
   * @param scope 查询范围
   */
  $focusFirst(scope: "shadow" | "light" | "all" = "shadow"): void {
    this.$getFocusableElements(scope)[0]?.focus();
  }

  /**
   * 聚焦到最后一个可聚焦元素
   * @param scope 查询范围
   */
  $focusLast(scope: "shadow" | "light" | "all" = "shadow"): void {
    const els = this.$getFocusableElements(scope);
    els[els.length - 1]?.focus();
  }
}
