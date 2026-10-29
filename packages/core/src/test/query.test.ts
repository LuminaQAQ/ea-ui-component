import { afterEach, describe, expect, it } from "vitest";
import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import { children } from "@decorator/children";
import { query, queryAll } from "@decorator/query";

@CustomElement("ea-test-query")
class EaTestQuery extends EaBase {
  @query(".inner")
  inner!: HTMLElement | null;

  @query(".light-only")
  shadowLookup!: HTMLElement | null;

  @queryAll(".item")
  items!: NodeListOf<Element> | null;

  @children("span")
  lightSpans!: NodeListOf<Element> | null;

  html(): string {
    return `<div class="inner"><i class="item"></i><i class="item"></i></div>`;
  }
}

const mount = (): EaTestQuery => {
  const el = document.createElement("ea-test-query") as EaTestQuery;
  document.body.append(el);
  return el;
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("@query / @queryAll / @children", () => {
  it("渲染前：@query 返回 null，@queryAll / @children 返回空 NodeList", () => {
    const el = document.createElement("ea-test-query") as EaTestQuery;
    expect(el.inner).toBeNull();
    // 特征测试：类型声明为 `NodeListOf<Element> | null`，但 shadowRoot 已存在的实际返回值是空 NodeList
    expect(el.items?.length).toBe(0);
    expect(el.lightSpans?.length).toBe(0);
  });

  it("连接后从 Shadow DOM 查询到元素", () => {
    const el = mount();
    expect(el.inner).toBeInstanceOf(HTMLElement);
    expect(el.items?.length).toBe(2);
  });

  it("@query 只查 Shadow DOM，不查 Light DOM", () => {
    const el = document.createElement("ea-test-query") as EaTestQuery;
    const light = document.createElement("div");
    light.className = "light-only";
    el.append(light);

    document.body.append(el);
    expect(el.shadowLookup).toBeNull();
  });

  it("@children 查询 Light DOM 子元素", () => {
    const el = document.createElement("ea-test-query") as EaTestQuery;
    el.append(document.createElement("span"));
    el.append(document.createElement("span"));
    el.append(document.createElement("div"));

    document.body.append(el);
    expect(el.lightSpans?.length).toBe(2);
  });

  it("每次访问都实时查询（不缓存）", () => {
    const el = mount();
    expect(el.items?.length).toBe(2);
    el.shadowRoot?.querySelector(".inner")?.append(document.createElement("i"));
    // 新元素没有 .item 类，因此数量不变；换成加类名再验证实时性
    const extra = document.createElement("i");
    extra.className = "item";
    el.shadowRoot?.querySelector(".inner")?.append(extra);
    expect(el.items?.length).toBe(3);
  });
});
