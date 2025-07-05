export const stylesheet = `
:host {
  --invalid-message: "";
}

.ea-dialog_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2024;
}
.ea-dialog_wrap .ea-dialog_board {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 420px;
  padding-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-sizing: 0 2px 12px 0;
  font-size: 18px;
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header {
  padding: 15px 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header .ea-dialog_header-title {
  font-size: 18px;
  line-height: 1;
  color: #303133;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_header .ea-dialog_header-close {
  display: inline-block;
  font-size: 16px;
  color: #909399;
  cursor: pointer;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_content .ea-dialog_content-input {
  display: none;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_footer {
  padding: 5px 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ea-dialog_wrap .ea-dialog_board .ea-dialog_footer :first-child {
  margin-right: 0.5rem;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content {
  position: relative;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content .ea-dialog_content-input {
  margin-top: 15px;
  padding-bottom: 15px;
  display: block;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content .ea-dialog_content-input::after {
  content: var(--invalid-message);
  position: absolute;
  display: block;
  bottom: 0;
  transform-origin: top center;
  transform: scaleY(0);
  transition: transform 0.3s;
}
.ea-dialog_wrap.is-prompt .ea-dialog_board .ea-dialog_content .ea-dialog_content-input[aria-invalid=true]::after {
  transform-origin: top center;
  transform: scaleY(1);
  color: #f56c6c;
}
`;