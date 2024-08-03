export const handleDefaultAttrIsTrue = (attr) => {
    if (attr === 'false' || attr === false) {
        attr = false;
    } else if (attr === 'true' || attr === true) {
        attr = true;
    } else {
        attr = true;
    }

    return attr;
}