export const stylesheet="\n.ea-timeline-item_wrap {\n  position: relative;\n  padding-bottom: 20px;\n  padding-left: 28px;\n  list-style: none;\n}\n.ea-timeline-item_wrap .ea-timeline-item_circle {\n  position: absolute;\n  left: 0;\n  z-index: 1;\n  display: block;\n  width: 12px;\n  height: 12px;\n  font-size: 12px;\n  border-radius: 50%;\n  background-color: #e4e7ed;\n}\n.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--primary {\n  background-color: #409eff;\n  color: #409eff;\n}\n.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--success {\n  background-color: #67c23a;\n  color: #67c23a;\n}\n.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--warning {\n  background-color: #e6a23c;\n  color: #e6a23c;\n}\n.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--danger {\n  background-color: #f56c6c;\n  color: #f56c6c;\n}\n.ea-timeline-item_wrap .ea-timeline-item_circle.ea-timeline-item--info {\n  background-color: #e4e7ed;\n  color: #e4e7ed;\n}\n.ea-timeline-item_wrap .ea-timeline-item_tail {\n  z-index: 0;\n  position: absolute;\n  left: 0.3281rem;\n  height: 100%;\n  border-left: 2px solid #e4e7ed;\n}\n.ea-timeline-item_wrap .ea-timeline-item_container {\n  position: relative;\n  top: -4px;\n  font-size: 14px;\n  display: flex;\n  flex-direction: column;\n}\n.ea-timeline-item_wrap .ea-timeline-item_container .ea-timeline-item_timestamp {\n  color: #909399;\n  line-height: 1;\n  margin-top: 8px;\n}\n.ea-timeline-item_wrap .ea-timeline-item_container .ea-timeline-item_content {\n  color: #303133;\n}\n.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--top {\n  flex-direction: column-reverse;\n}\n.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--top .ea-timeline-item_timestamp {\n  margin-top: 0;\n  margin-bottom: 8px;\n}\n.ea-timeline-item_wrap .ea-timeline-item_container.ea-timeline-item_timestamp--bottom {\n  flex-direction: column;\n}\n.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_circle {\n  width: 14px;\n  height: 14px;\n}\n.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_tail {\n  left: 0.3906rem;\n}\n.ea-timeline-item_wrap.ea-timeline-item_circle--large .ea-timeline-item_container {\n  font-size: 16px;\n}\n";