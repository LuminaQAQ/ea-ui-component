export const stylesheet = `
:host {
  --margin-right: 0.75rem;
  --text-color: #606266;
  --radio-show-type: inline-block;
  --button-size: 1rem;
  --button-margin: 0.5rem;
}

.ea-radio_wrap {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.ea-radio_wrap .ea-radio-input_wrap {
  width: var(--button-size);
  height: var(--button-size);
  line-height: 1;
  margin-right: var(--button-margin);
}
.ea-radio_wrap .ea-radio-input_wrap input {
  display: none;
}
.ea-radio_wrap .ea-radio-input_wrap .ea-radio-input_inner {
  position: relative;
  display: var(--radio-show-type);
  width: 1rem;
  height: 1rem;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1px solid #606266;
}
.ea-radio_wrap .ea-radio-input_wrap .ea-radio-input_inner::before {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  content: "";
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background-color: transparent;
  box-sizing: border-box;
  transition: all 0.3s ease;
}
.ea-radio_wrap .ea-radio-input_wrap .ea-radio-input_inner:hover {
  border-color: #409eff;
}
.ea-radio_wrap .ea-radio-label_desc {
  color: var(--text-color);
}
.ea-radio_wrap.checked .ea-radio-input_wrap .ea-radio-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-radio_wrap.checked .ea-radio-input_wrap .ea-radio-input_inner::before {
  background-color: white;
}
.ea-radio_wrap.checked .ea-radio-label_desc {
  color: #409eff;
}
.ea-radio_wrap.disabled .ea-radio-input_wrap .ea-radio-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-radio_wrap.disabled .ea-radio-input_wrap .ea-radio-input_inner::before {
  background-color: transparent;
}
.ea-radio_wrap.disabled .ea-radio-label_desc {
  color: #c0c4cc;
}
.ea-radio_wrap.disabled[checked=true] .ea-radio-input_inner::before {
  background-color: #c0c4cc;
}
.ea-radio_wrap.border {
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}
.ea-radio_wrap.border[checked=true] {
  border: 1px solid #409eff;
}
`;