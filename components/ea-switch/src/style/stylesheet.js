export const stylesheet = `
:host {
  --active-text-color: #409eff;
  --inactive-text-color: ##606266;
  --active-checkbox-bgc: #409eff;
  --inactive-checkbox-bgc: #eff1f5;
  --active-disabled-text-color: #7ebfff;
  --active-disabled-bgc: #bbdcff;
  --inactive-disabled-text-color: #c0c4cc;
  --inactive-disabled-bgc: #eff1f5;
}

.ea-switch_wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.ea-switch_wrap input {
  display: none;
}
.ea-switch_wrap .ea-switch_label {
  font-size: 0.875rem;
  transition: color 0.2s;
}
.ea-switch_wrap input + .ea-switch_label--left {
  color: var(--active-text-color);
}
.ea-switch_wrap input:checked + .ea-switch_label--left {
  color: var(--inactive-text-color);
}
.ea-switch_wrap input:checked + .ea-switch_label--left + .ea-switch_core {
  background-color: var(--active-checkbox-bgc);
}
.ea-switch_wrap input:checked + .ea-switch_label--left + .ea-switch_core::after {
  left: calc(100% - 1rem - 2px);
}
.ea-switch_wrap input:checked + .ea-switch_label--left + .ea-switch_core + .ea-switch_label--right {
  color: var(--active-text-color);
}
.ea-switch_wrap input:disabled + .ea-switch_label--left {
  color: var(--active-disabled-text-color);
}
.ea-switch_wrap input:disabled + .ea-switch_label--left + .ea-switch_core {
  background-color: var(--inactive-disabled-bgc);
}
.ea-switch_wrap input:disabled + .ea-switch_label--left + .ea-switch_core + .ea-switch_label--right {
  color: var(--inactive-disabled-text-color);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left {
  color: var(--inactive-disabled-text-color);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left + .ea-switch_core {
  background-color: var(--active-disabled-bgc);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left + .ea-switch_core::after {
  left: calc(100% - 1rem - 2px);
}
.ea-switch_wrap input:checked:disabled + .ea-switch_label--left + .ea-switch_core + .ea-switch_label--right {
  color: var(--inactive-disabled-text-color);
}
.ea-switch_wrap .ea-switch_core {
  position: relative;
  cursor: pointer;
  margin: 0 0.75rem;
  width: 2.5rem;
  height: 1.25rem;
  line-height: 1.25rem;
  background-color: var(--inactive-checkbox-bgc);
  border-radius: 999px;
  transition: background-color 0.2s;
}
.ea-switch_wrap .ea-switch_core::after {
  content: "";
  display: block;
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translate(0, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  background-color: #fff;
  transition: left 0.2s, transform 0.2s;
}
.ea-switch_wrap.disabled {
  cursor: not-allowed;
}
.ea-switch_wrap.disabled .ea-switch_label,
.ea-switch_wrap.disabled .ea-switch_core {
  pointer-events: none;
}
`;