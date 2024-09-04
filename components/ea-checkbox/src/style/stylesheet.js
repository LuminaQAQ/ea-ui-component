export const stylesheet = `
:host {
  --margin-right: 1rem;
}

.ea-checkbox_wrap {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  margin-right: var(--margin-right);
}
.ea-checkbox_wrap input {
  display: none;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap {
  line-height: 1;
  margin-right: 0.5rem;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 0.8125rem;
  height: 0.8125rem;
  line-height: 0.8125;
  border-radius: 3px;
  border: 1px solid #ccc;
  transition: background-color 0.2s, border-color 0.2s;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  content: "";
  position: absolute;
  left: 52.5%;
  top: 45%;
  transform: translate(-50%, -50%) rotate(-135deg);
  display: block;
  width: 3px;
  height: 7px;
  opacity: 0;
  transition: opacity 0.2s;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_input {
  display: none;
}
.ea-checkbox_wrap .ea-checkbox-label_desc {
  line-height: 1;
  transition: color 0.2s;
}
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true] + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true] + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  opacity: 1;
  left: 50%;
  top: 50%;
  width: 80%;
  height: 3px;
  background-color: white;
  transform: translate(-50%, -50%) rotate(0deg);
}
.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
}
.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,
.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {
  color: #409eff;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner,
.ea-checkbox_wrap .ea-checkbox-input_input:checked:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner::before,
.ea-checkbox_wrap .ea-checkbox-input_input:checked:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {
  background-color: transparent;
}
.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,
.ea-checkbox_wrap .ea-checkbox-input_input:checked:disabled + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {
  color: #c0c4cc;
}
`;