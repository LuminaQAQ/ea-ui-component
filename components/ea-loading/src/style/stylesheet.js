export const stylesheet = `
.ea-loading_wrap {
  position: relative;
}
.ea-loading_wrap .ea-loading_mask {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 100%, 0.9);
  z-index: 1;
  transition: background-color 0.2s;
}
.ea-loading_wrap .ea-loading_spinner,
.ea-loading_wrap .ea-loading_text {
  color: #409eff;
}
.ea-loading_wrap .ea-loading_spinner {
  font-size: 2rem;
}
.ea-loading_wrap .ea-loading_text {
  margin-left: 0.5rem;
}
.ea-loading_wrap.ea-loading_wrap--fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3000;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ea-loading_wrap.ea-loading_wrap--loading .ea-loading_mask {
  display: flex;
}
`;