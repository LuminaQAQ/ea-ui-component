export const stylesheet = `
.ea-collapse-item_wrap .ea-collapse-item_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  height: 48px;
  line-height: 48px;
  font-size: 13px;
  font-weight: 700;
  color: #303133;
  cursor: pointer;
}
.ea-collapse-item_wrap .ea-collapse-item_title .ea-collapse-item_title-icon {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 1rem;
  border: 3px solid #9ca0a5;
  border-left-color: transparent;
  border-top-color: transparent;
  rotate: -45deg;
  transition: rotate 0.3s;
}
.ea-collapse-item_wrap .ea-collapse-item_content {
  will-change: height;
  overflow: hidden;
  height: 0;
  padding-bottom: 0;
  transition: height 0.3s, padding-bottom 0.3s;
  font-size: 13px;
  color: #303133;
}
`;