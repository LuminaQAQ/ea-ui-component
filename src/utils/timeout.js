export const timeout = (fn, time = 0) => {
  let timer = setTimeout(() => {
    clearTimeout(timer);
    timer = null;
    fn();
  }, time);

  return timer;
};

export const withTransitionTimeOut = (container, time = 300) => {
  let timer = setTimeout(() => {
    clearTimeout(timer);
    timer = null;

    container.classList.add("with-transition");
  }, time);
};
