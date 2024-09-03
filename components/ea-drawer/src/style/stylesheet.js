export const stylesheet="\n.ea-drawer_wrap {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 2001;\n}\n.ea-drawer_wrap .ea-drawer_drawer-wrap {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  transition: left 0.3s, right 0.3s, top 0.3s, bottom 0.3s;\n}\n.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_header-wrap {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  margin-bottom: 32px;\n  padding: 20px 20px 0;\n  color: #72767b;\n}\n.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_header-wrap .ea-drawer_icon {\n  cursor: pointer;\n}\n.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_main-wrap {\n  flex: 1;\n  box-sizing: border-box;\n  padding: 20px;\n  overflow: auto;\n}\n.ea-drawer_wrap .ea-drawer_drawer-wrap .ea-drawer_mask-wrap {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: -1;\n  opacity: 0;\n  scale: 0;\n  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.3s, bottom 0.3s;\n}\n.ea-drawer_wrap.direction-ltr, .ea-drawer_wrap.direction-rtl {\n  top: 0;\n}\n.ea-drawer_wrap.direction-ltr .ea-drawer_drawer-wrap, .ea-drawer_wrap.direction-rtl .ea-drawer_drawer-wrap {\n  top: 0;\n  height: 100%;\n}\n.ea-drawer_wrap.direction-ttb, .ea-drawer_wrap.direction-btt {\n  left: 0;\n}\n.ea-drawer_wrap.direction-ttb .ea-drawer_drawer-wrap, .ea-drawer_wrap.direction-btt .ea-drawer_drawer-wrap {\n  left: 0;\n  width: 100%;\n}\n.ea-drawer_wrap.direction-ttb .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt .ea-drawer_mask-wrap {\n  left: 0;\n}\n.ea-drawer_wrap.direction-ltr.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-rtl.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-ttb.is-open .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt.is-open .ea-drawer_mask-wrap {\n  opacity: 1;\n  scale: 1;\n}\n.ea-drawer_wrap.direction-ltr.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-rtl.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-ttb.will-close .ea-drawer_mask-wrap, .ea-drawer_wrap.direction-btt.will-close .ea-drawer_mask-wrap {\n  opacity: 0;\n  scale: 0;\n}\n.ea-drawer_wrap.direction-ltr {\n  left: -100%;\n}\n.ea-drawer_wrap.direction-ltr .ea-drawer_drawer-wrap {\n  left: -100%;\n}\n.ea-drawer_wrap.direction-ltr .ea-drawer_mask-wrap {\n  left: 0;\n}\n.ea-drawer_wrap.direction-ltr.is-open {\n  left: 0;\n}\n.ea-drawer_wrap.direction-ltr.is-open .ea-drawer_drawer-wrap {\n  left: 0;\n}\n.ea-drawer_wrap.direction-ltr.will-close .ea-drawer_drawer-wrap {\n  left: -100%;\n}\n.ea-drawer_wrap.direction-rtl {\n  right: -100%;\n}\n.ea-drawer_wrap.direction-rtl .ea-drawer_drawer-wrap {\n  right: -100%;\n}\n.ea-drawer_wrap.direction-rtl .ea-drawer_mask-wrap {\n  right: 0;\n}\n.ea-drawer_wrap.direction-rtl.is-open {\n  right: 0;\n}\n.ea-drawer_wrap.direction-rtl.is-open .ea-drawer_drawer-wrap {\n  right: 0;\n}\n.ea-drawer_wrap.direction-rtl.will-close .ea-drawer_drawer-wrap {\n  right: -100%;\n}\n.ea-drawer_wrap.direction-ttb {\n  bottom: -100%;\n}\n.ea-drawer_wrap.direction-ttb .ea-drawer_drawer-wrap {\n  bottom: -100%;\n}\n.ea-drawer_wrap.direction-ttb .ea-drawer_mask-wrap {\n  bottom: 0;\n}\n.ea-drawer_wrap.direction-ttb.is-open {\n  bottom: 0;\n}\n.ea-drawer_wrap.direction-ttb.is-open .ea-drawer_drawer-wrap {\n  bottom: 0;\n}\n.ea-drawer_wrap.direction-ttb.will-close .ea-drawer_drawer-wrap {\n  bottom: -100%;\n}\n.ea-drawer_wrap.direction-btt {\n  top: -100%;\n}\n.ea-drawer_wrap.direction-btt .ea-drawer_drawer-wrap {\n  top: -100%;\n}\n.ea-drawer_wrap.direction-btt .ea-drawer_mask-wrap {\n  top: 0;\n}\n.ea-drawer_wrap.direction-btt.is-open {\n  top: 0;\n}\n.ea-drawer_wrap.direction-btt.is-open .ea-drawer_drawer-wrap {\n  top: 0;\n}\n.ea-drawer_wrap.direction-btt.will-close .ea-drawer_drawer-wrap {\n  top: -100%;\n}\n";