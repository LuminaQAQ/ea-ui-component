
/**
 * 初始化轮播图自动播放功能。
 * @param {number} duration - 每张图片展示的时间间隔，单位为秒。
 */
export function initCarouselAutoPlay(duration) {
    let timer = setInterval(() => {
        this.index = this.index + 1;
    }, duration * 1000);

    // 当鼠标进入轮播图区域时，停止自动播放
    this.addEventListener('mouseenter', () => {
        clearInterval(timer);
        timer = null;
    });

    // 当鼠标离开轮播图区域时，恢复自动播放
    this.addEventListener('mouseleave', () => {
        timer = setInterval(() => {
            this.index = this.index + 1;
        }, duration * 1000)
    });
}