export const px2num = (px: string | undefined | null): number => {
  return Number(px?.replace("px", ""));
};

export const addAsyncEventListener = (
  context: EventTarget,
  eventName: string,
  once: boolean = true
): Promise<true> => {
  return new Promise(resolve => {
    context.addEventListener(
      eventName,
      (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        resolve(true);
      },
      { once }
    );
  });
};
