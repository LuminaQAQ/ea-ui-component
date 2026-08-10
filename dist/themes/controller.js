const o = "ea-theme", a = "dark";
function c() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function n() {
  return localStorage.getItem(o);
}
function t(e) {
  document.documentElement.classList.toggle(a, e);
}
function r() {
  document.dispatchEvent(
    new CustomEvent("ea-theme-change", {
      detail: { mode: s() }
    })
  );
}
function l() {
  const e = n(), m = c();
  t(e === "dark" || e !== "light" && m), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (i) => {
    (!n() || n() === "auto") && (t(i.matches), r());
  });
}
function d(e) {
  e === "auto" ? (localStorage.removeItem(o), t(c())) : (localStorage.setItem(o, e), t(e === "dark")), r();
}
function s() {
  return document.documentElement.classList.contains(a) ? "dark" : "light";
}
function u() {
  d(s() === "dark" ? "light" : "dark");
}
export {
  s as getCurrentTheme,
  l as initTheme,
  d as setTheme,
  u as toggleTheme
};
