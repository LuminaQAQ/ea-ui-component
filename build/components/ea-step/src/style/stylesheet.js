export const stylesheet="\n.ea-step_wrap {\n  color: #c0c4cc;\n  transition: color 0.3s;\n}\n.ea-step_wrap .ea-step_head-wrap {\n  position: relative;\n}\n.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon {\n  position: relative;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  width: 24px;\n  height: 24px;\n  background-color: #fff;\n  font-size: 14px;\n  z-index: 1;\n}\n.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon.is-text {\n  border-radius: 50%;\n  border: 2px solid;\n}\n.ea-step_wrap .ea-step_head-wrap .ea-step_bar {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  margin-left: 2px;\n  width: 100%;\n  height: 2px;\n  background-color: #c0c4cc;\n}\n.ea-step_wrap .ea-step_head-wrap.is-last {\n  flex-basis: auto;\n}\n.ea-step_wrap .ea-step_head-wrap.is-last .ea-step_bar {\n  display: none;\n}\n.ea-step_wrap .ea-step_main-wrap {\n  white-space: normal;\n  text-align: left;\n}\n.ea-step_wrap .ea-step_main-wrap .ea-step_title-wrap {\n  font-size: 16px;\n  line-height: 38px;\n}\n.ea-step_wrap .ea-step_main-wrap .ea-step_description-wrap {\n  margin-top: -5px;\n  font-size: 12px;\n  line-height: 20px;\n}\n.ea-step_wrap.is-process {\n  color: #303133;\n  border-color: #303133;\n}\n.ea-step_wrap.is-finish {\n  color: #67c23a;\n  border-color: #67c23a;\n}\n.ea-step_wrap.is-finish .ea-step_head-wrap .ea-step_bar {\n  background-color: #67c23a;\n}\n.ea-step_wrap.is-simple {\n  display: flex;\n  align-items: center;\n}\n.ea-step_wrap.is-simple .ea-step_head-wrap {\n  position: relative;\n}\n.ea-step_wrap.is-simple .ea-step_head-wrap .ea-step_bar {\n  position: relative;\n  width: auto;\n  height: auto;\n  transform: translateY(0%);\n  margin-left: 2px;\n  flex: 1;\n}\n.ea-step_wrap.is-simple .ea-step_main-wrap {\n  margin-left: 16px;\n  line-height: 24px;\n  height: 24px;\n}\n.ea-step_wrap.is-simple .ea-step_main-wrap .ea-step_title-wrap {\n  line-height: 24px;\n}\n";