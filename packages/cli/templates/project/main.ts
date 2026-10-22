import "./src/index";

const minus = document.getElementById("minus")!;
const plus = document.getElementById("plus")!;
const valueEl = document.getElementById("value")!;
let value = 0;

function render(): void {
  valueEl.textContent = String(value);
  minus.toggleAttribute("disabled", value === 0);
  plus.toggleAttribute("disabled", value === 99);
}

minus.addEventListener("click", () => {
  value = Math.max(0, value - 1);
  render();
});

plus.addEventListener("click", () => {
  value = Math.min(99, value + 1);
  render();
});

render();
