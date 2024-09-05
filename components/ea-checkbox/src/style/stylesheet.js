export const stylesheet='\n:host {\n  --margin-right: 1rem;\n}\n\n.ea-checkbox_wrap {\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n  user-select: none;\n  margin-right: var(--margin-right);\n}\n.ea-checkbox_wrap input {\n  display: none;\n}\n.ea-checkbox_wrap .ea-checkbox-input_wrap {\n  line-height: 1;\n  margin-right: 0.5rem;\n}\n.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner {\n  box-sizing: border-box;\n  position: relative;\n  display: block;\n  width: 0.8125rem;\n  height: 0.8125rem;\n  line-height: 0.8125;\n  border-radius: 3px;\n  border: 1px solid #ccc;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {\n  content: "";\n  position: absolute;\n  left: 52.5%;\n  top: 45%;\n  transform: translate(-50%, -50%) rotate(-135deg);\n  display: block;\n  width: 3px;\n  height: 7px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_input {\n  display: none;\n}\n.ea-checkbox_wrap .ea-checkbox-label_desc {\n  line-height: 1;\n  transition: color 0.2s;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true] + .ea-checkbox-input_wrap .ea-checkbox-input_inner {\n  border-color: #409eff;\n  background-color: #409eff;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true] + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {\n  opacity: 1;\n  left: 50%;\n  top: 50%;\n  width: 80%;\n  height: 3px;\n  background-color: white;\n  transform: translate(-50%, -50%) rotate(0deg);\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner,\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner,\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner {\n  border-color: #409eff;\n  background-color: #409eff;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after,\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after,\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {\n  opacity: 1;\n  border-left: 2px solid white;\n  border-top: 2px solid white;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=true]:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc,\n.ea-checkbox_wrap .ea-checkbox-input_input[indeterminate=false]:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {\n  color: #409eff;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled {\n  pointer-events: none;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap {\n  cursor: not-allowed;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner {\n  border-color: #eeeeee;\n  background-color: #eeeeee;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {\n  background-color: transparent;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {\n  cursor: not-allowed;\n  color: #c0c4cc;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner {\n  border-color: #eeeeee;\n  background-color: #eeeeee;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled:checked + .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {\n  opacity: 1;\n  border-left: 2px solid white;\n  border-top: 2px solid white;\n}\n.ea-checkbox_wrap .ea-checkbox-input_input:disabled:checked + .ea-checkbox-input_wrap + .ea-checkbox-label_desc {\n  color: #c0c4cc;\n}\n';