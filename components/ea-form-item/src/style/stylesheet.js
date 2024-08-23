export const stylesheet = `
.ea-form-item_wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.ea-form-item_wrap .ea-form-item_label-wrap {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.ea-form-item_wrap .ea-form-item_content-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
}
.ea-form-item_wrap .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: top center;
  transform: translateY(100%) scaleY(0);
  font-size: 12px;
  color: #f56c6c;
  white-space: nowrap;
}
.ea-form-item_wrap.is-required-star .ea-form-item_label-wrap::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.ea-form-item_wrap.is-required .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-form-item_wrap.with-transition .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transition: transform 0.3s;
}
`;