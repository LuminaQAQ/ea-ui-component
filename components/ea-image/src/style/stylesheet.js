export const stylesheet = `
.ea-image_wrap.is-error svg {
  width: 20px;
  height: 20px;
}
.ea-image_wrap img {
  position: relative;
  width: 100%;
  height: 100%;
  user-zoom: scale;
  object-fit: cover;
  transition: rotate 0.3s, scale 0.3s;
}
.ea-image_wrap .ea-image_preview-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  transform: translateY(-1rem);
  transition: opacity 0.3s, transform 0.3s;
  background-color: rgba(0, 0, 0, 0.4);
}
.ea-image_wrap .ea-image_preview-wrap.entry {
  opacity: 1;
  transform: translateY(0);
}
.ea-image_wrap .ea-image_preview-wrap .ea-icon-close {
  position: absolute;
  right: 40px;
  top: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 24px;
  line-height: 36px;
  border-radius: 50%;
  color: #fff;
  background-color: #606266;
  text-align: center;
}
.ea-image_wrap .ea-image_preview-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ea-image_wrap .ea-image_preview-tools {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 20px;
  left: 50%;
  padding: 0.5rem 1rem;
  user-select: none;
  border-radius: 999px;
  transform: translateX(-50%);
  background-color: rgba(96, 98, 102, 0.568627451);
  color: #fff;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom,
.ea-image_wrap .ea-image_preview-tools .ea-icon-rotate {
  width: 2rem;
  text-align: center;
  cursor: pointer;
  margin: 0 1rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom {
  font-size: 2rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-zoom-in {
  font-size: 1.75rem;
}
.ea-image_wrap .ea-image_preview-tools .ea-icon-rotate {
  font-size: 1.5rem;
}
`;