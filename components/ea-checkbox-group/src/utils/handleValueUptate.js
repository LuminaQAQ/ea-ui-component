export function handleValueUptate(checkboxes) {
    let valueArr = [];
    Array.from(checkboxes).filter(item => {
        if (item.checked) return valueArr.push(item.value);
        return false;
    })

    this.value = valueArr.join(',');
}