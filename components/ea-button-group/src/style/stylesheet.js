export const stylesheet = `
.ea-button-group {
  display: flex;
  align-items: center;
}
.ea-button-group ::slotted(ea-button) {
  --border-radius: 0;
}
.ea-button-group ::slotted(ea-button:not([type=normal])) {
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}
.ea-button-group ::slotted(ea-button:first-of-type) {
  --border-radius: 4px 0 0 4px;
}
.ea-button-group ::slotted(ea-button:last-of-type) {
  --border-radius: 0 4px 4px 0;
}
`;