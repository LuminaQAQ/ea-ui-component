export const createSkeletonElement = (className, isAnimated) => {
    const el = document.createElement('ea-skeleton-item');
    el.variant = className;
    el.animated = isAnimated;

    return el;
};