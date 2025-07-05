export function getUserWeekStart(weekArr, start) {
    if (!weekArr.includes(start)) return weekArr;

    const index = weekArr.findIndex((item, index) => {
        if (item === start) return index;
    })

    if (index === 0 || index === -1) return weekArr;

    return weekArr.slice(index).concat(weekArr.slice(0, index));
}