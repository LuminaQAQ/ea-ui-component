export const stylesheet = `
.ea-step_wrap {
  color: #c0c4cc;
  transition: color 0.3s;
}
.ea-step_wrap .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: #fff;
  font-size: 14px;
  z-index: 1;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon.is-text {
  border-radius: 50%;
  border: 2px solid;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 2px;
  width: 100%;
  height: 2px;
  background-color: #c0c4cc;
}
.ea-step_wrap .ea-step_head-wrap.is-last {
  flex-basis: auto;
}
.ea-step_wrap .ea-step_head-wrap.is-last .ea-step_bar {
  display: none;
}
.ea-step_wrap .ea-step_main-wrap {
  white-space: normal;
  text-align: left;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_title-wrap {
  font-size: 16px;
  line-height: 38px;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_description-wrap {
  margin-top: -5px;
  font-size: 12px;
  line-height: 20px;
}
.ea-step_wrap.is-process {
  color: #303133;
  border-color: #303133;
}
.ea-step_wrap.is-finish {
  color: #67c23a;
  border-color: #67c23a;
}
.ea-step_wrap.is-finish .ea-step_head-wrap .ea-step_bar {
  background-color: #67c23a;
}
.ea-step_wrap.is-simple {
  display: flex;
  align-items: center;
}
.ea-step_wrap.is-simple .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap.is-simple .ea-step_head-wrap .ea-step_bar {
  position: relative;
  width: auto;
  height: auto;
  transform: translateY(0%);
  margin-left: 2px;
  flex: 1;
}
.ea-step_wrap.is-simple .ea-step_main-wrap {
  margin-left: 16px;
  line-height: 24px;
  height: 24px;
}
.ea-step_wrap.is-simple .ea-step_main-wrap .ea-step_title-wrap {
  line-height: 24px;
}
`;