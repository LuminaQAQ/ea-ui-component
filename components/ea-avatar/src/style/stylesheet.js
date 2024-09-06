
export const stylesheet = `
.ea-avatar_wrap .ea-avatar {
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #ffffff;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--fill img {
  object-fit: fill;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--contain img {
  object-fit: contain;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--cover img {
  object-fit: cover;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--none img {
  object-fit: none;
}
.ea-avatar_wrap .ea-avatar.ea-avatar-fill--scale-down img {
  object-fit: scale-down;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--normal {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--large {
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--medium {
  width: 36px;
  height: 36px;
  line-height: 36px;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--small {
  width: 28px;
  height: 28px;
  line-height: 28px;
}
.ea-avatar_wrap .ea-avatar .ea-avatar--text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ea-avatar_wrap .ea-avatar.ea-avatar--circle {
  border-radius: 50%;
}
.ea-avatar_wrap .ea-avatar.ea-avatar--square {
  border-radius: 5px;
}
.ea-avatar_wrap .ea-avatar .ea-avatar--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;