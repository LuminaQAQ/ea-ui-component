export const stylesheet = `
.ea-skeleton_wrap {
  width: 100%;
  position: relative;
  border-radius: 4px;
}
.ea-skeleton_wrap ea-skeleton-item[variant=p]:first-child {
  --p-width: 33%;
  --margin-top: 0;
}
.ea-skeleton_wrap ea-skeleton-item[variant=p]:last-child {
  --p-width: 61%;
}
`;