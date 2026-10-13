// IntersectionObserver 测试替身：jsdom 未实现该 API
// Immediate 版在 observe() 时立即以「完全可见」触发回调；
// Controlled 版仅记录实例与观察目标，由用例手动 trigger 控制时机

type TriggerEntry = {
  intersectionRatio?: number;
  isIntersecting: boolean;
  target: Element | null;
};

export class ImmediateIntersectionObserver implements IntersectionObserver {
  callback: IntersectionObserverCallback;
  root: Element | Document | null = null;
  rootMargin: string = "0px";
  thresholds: number[] = [0];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.root = (options?.root as Element | Document | null) ?? null;
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
  }

  observe(target: Element) {
    this.callback(
      [
        { intersectionRatio: 1, isIntersecting: true, target },
      ] as IntersectionObserverEntry[],
      this
    );
  }

  unobserve(_target: Element) {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

export class ControlledIntersectionObserver implements IntersectionObserver {
  static instances: ControlledIntersectionObserver[] = [];

  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
  root: Element | Document | null = null;
  rootMargin: string = "0px";
  thresholds: number[] = [0];
  observing: Element[] = [];

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) {
    this.callback = callback;
    this.options = options;
    this.root = (options.root as Element | Document | null) ?? null;
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
    ControlledIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.observing.push(target);
  }

  unobserve(target: Element) {
    this.observing = this.observing.filter(el => el !== target);
  }

  disconnect() {
    this.observing = [];
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(entries: TriggerEntry[]) {
    this.callback(entries as IntersectionObserverEntry[], this);
  }

  static reset() {
    ControlledIntersectionObserver.instances = [];
  }
}
