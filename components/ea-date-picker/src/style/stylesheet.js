export const stylesheet = `
.ea-date-picker_wrap .ea-date-picker_input-wrap {
  position: relative;
}
.ea-date-picker_wrap .ea-date-picker_dropdown-wrap {
  position: absolute;
  background-color: #fff;
  transform-origin: top center;
  transform: scaleY(0);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-date-picker_wrap.is-open .ea-date-picker_dropdown-wrap {
  transform: scaleY(1);
}
.ea-date-picker_wrap.with-transition .ea-date-picker_dropdown-wrap {
  transition: transform 0.3s;
}
`;