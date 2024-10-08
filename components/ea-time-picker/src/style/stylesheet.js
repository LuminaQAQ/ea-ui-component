export const stylesheet = `
.ea-time-picker_wrap {
  position: relative;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap {
  position: absolute;
  bottom: -12px;
  left: 0;
  transform-origin: center top;
  transform: translateY(100%) scaleY(0);
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0.5rem;
  border: 0.5rem solid transparent;
  border-bottom-color: #fff;
  transform: translateY(-100%);
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap {
  display: flex;
  position: relative;
  margin: 1rem 0;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before, .ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before {
  top: calc(50% - 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  top: calc(50% + 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner {
  flex: 1;
  max-height: 190px;
  box-sizing: border-box;
  padding: 5rem 0;
  text-align: center;
  overflow: auto;
  scrollbar-width: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  list-style-type: none;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  transition: color 0.3s;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-active {
  color: #409eff;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-disabled {
  color: #c0c4cc;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-button-group {
  text-align: right;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.ea-time-picker_wrap.is-open .ea-time-picker_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-time-picker_wrap.with-transition .ea-time-picker_dropdown-wrap {
  transition: transform 0.3s ease-in-out;
}
`;