export const stylesheet = `
:host {
  --i-color: rgb(247, 186, 42);
}
.ea-rate_wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.ea-rate_wrap .ea-rate_item {
  cursor: pointer;
}
.ea-rate_wrap .ea-rate_item ea-icon::part(container) {
  color: var(--i-color);
  transition: color 0.3s, font-size 0.1s;
}
.ea-rate_wrap .ea-rate_item.active ea-icon::part(container) {
  font-size: 1.1rem;
}
.ea-rate_wrap .ea-rate_item.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-rate_wrap .ea-rate_text {
  margin-left: 0.25rem;
  min-width: 2rem;
  font-size: 0.8rem;
  line-height: 0.8;
  vertical-align: middle;
}
.ea-rate_wrap .ea-rate_score {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item {
  width: 24px;
  height: 24px;
}
.ea-rate_wrap .ea-rate_score .ea-rate_score_item > i {
  color: #c0c4cc;
  font-size: 1rem;
  line-height: 1;
}
`;