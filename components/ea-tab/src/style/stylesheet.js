export const stylesheet = `
.ea-tab_wrap {
  --border-radius-top-left: 0;
  --border-radius-top-right: 0;
  --border-right-width: 0;
  position: relative;
  box-sizing: border-box;
  padding: 0 1.25rem;
  height: 40px;
  line-height: 40px;
  min-width: 1rem;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s, width 0.3s, min-width 0.3s;
}
.ea-tab_wrap:hover {
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--normal.is-actived {
  color: #409eff;
}
.ea-tab_wrap.ea-tabs_wrap--card {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tab_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--card.is-actived {
  border-bottom-color: white;
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--border-card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--border-card.is-actived {
  border-bottom-color: white;
  color: #409eff;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--editable .ea-tab_wrap--editable-sign {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 0;
  overflow: hidden;
  transition: width 0.3s;
}
.ea-tab_wrap.ea-tab_wrap--editable:hover .ea-tab_wrap--editable-sign {
  width: 14px;
}
`;