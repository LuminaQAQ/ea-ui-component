export const stylesheet = `
.ea-input-number_wrap {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: border 0.2s;
}
.ea-input-number_wrap .ea-input-number_sign {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  user-select: none;
}
.ea-input-number_wrap .ea-input-number_sign:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-right: 0;
}
.ea-input-number_wrap .ea-input-number_sign:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 0;
}
.ea-input-number_wrap .ea-input-number_sign:hover {
  color: #409eff;
}
.ea-input-number_wrap .ea-input-number_sign.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner {
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
  width: 5rem;
  height: 2rem;
  border-radius: 0;
  text-align: center;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #409eff;
}
.ea-input-number_wrap .ea-input-number_inner::placeholder {
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.invalid {
  border-color: #f56c6c;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input_clear ::before {
  content: "\e9c3";
  display: block;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #dcdfe6;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
  background-color: #f5f7fa;
}
.ea-input-number_wrap.focus {
  border: 1px solid #409eff;
}
.ea-input-number_wrap.focus .ea-input-number_sign {
  border-color: transparent;
}
.ea-input-number_wrap.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-input-number_wrap.disabled .ea-input-number_sign,
.ea-input-number_wrap.disabled .ea-input-number_inner {
  color: #c0c4cc;
  border-color: #dcdfe6;
}
.ea-input-number_wrap.ea-input-number--medium .ea-input-number_sign {
  height: 1.75rem;
  width: 1.75rem;
}
.ea-input-number_wrap.ea-input-number--medium .ea-input-number_inner {
  height: 1.75rem;
  line-height: 1.75rem;
}
.ea-input-number_wrap.ea-input-number--small .ea-input-number_sign {
  height: 1.5rem;
  width: 1.5rem;
}
.ea-input-number_wrap.ea-input-number--small .ea-input-number_inner {
  height: 1.5rem;
  line-height: 1.5rem;
}
.ea-input-number_wrap.ea-input-number--mini .ea-input-number_sign {
  height: 1.25rem;
  width: 1.25rem;
}
.ea-input-number_wrap.ea-input-number--mini .ea-input-number_inner {
  height: 1.25rem;
  line-height: 1.25rem;
}
`;