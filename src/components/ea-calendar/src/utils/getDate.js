export function getToday() {
    const myDate = new Date();

    return `${myDate.getFullYear()}-${myDate.getMonth() + 1}`
}

export function getUserToday(date) {
    const myDate = new Date(date);

    return `${myDate.getFullYear()}-${myDate.getMonth() + 1}`
}