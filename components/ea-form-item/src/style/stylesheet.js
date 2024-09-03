export const stylesheet='\n.ea-form-item_wrap {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 22px;\n}\n.ea-form-item_wrap .ea-form-item_label-wrap {\n  text-align: right;\n  float: left;\n  font-size: 14px;\n  color: #606266;\n  line-height: 40px;\n  padding: 0 12px 0 0;\n  box-sizing: border-box;\n}\n.ea-form-item_wrap .ea-form-item_content-wrap {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.ea-form-item_wrap .ea-form-item_content-wrap .ea-form-item_invalid-wrap {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  transform-origin: top center;\n  transform: translateY(100%) scaleY(0);\n  font-size: 12px;\n  color: #f56c6c;\n  white-space: nowrap;\n}\n.ea-form-item_wrap.is-required-star .ea-form-item_label-wrap::before {\n  content: "*";\n  color: #f56c6c;\n  margin-right: 4px;\n}\n.ea-form-item_wrap.is-required .ea-form-item_content-wrap .ea-form-item_invalid-wrap {\n  transform: translateY(100%) scaleY(1);\n}\n.ea-form-item_wrap.with-transition .ea-form-item_content-wrap .ea-form-item_invalid-wrap {\n  transition: transform 0.3s;\n}\n';