export const timeout = (fn, time = 0) => {
    let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        fn();
    }, time);
}