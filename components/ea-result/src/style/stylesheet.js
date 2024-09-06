export const stylesheet = `
.ea-result_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px 30px;
}
.ea-result_wrap .ea-result_icon {
  font-size: 3rem;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-ok-circled] {
  color: #67c23a;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-cancel-circled] {
  color: #f56c6c;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-attention-alt] {
  color: #e6a23c;
}
.ea-result_wrap .ea-result_icon ea-icon[icon=icon-info] {
  color: #909399;
}
.ea-result_wrap .ea-result_title,
.ea-result_wrap .ea-result_subtitle {
  color: #5e6d82;
  font-size: 14px;
}
.ea-result_wrap .ea-result_title {
  margin-top: 20px;
}
.ea-result_wrap .ea-result_subtitle {
  margin-top: 10px;
}
.ea-result_wrap .ea-result_extra {
  margin-top: 30px;
}
`;