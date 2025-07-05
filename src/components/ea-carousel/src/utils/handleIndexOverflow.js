export function handleIndexOverflow(length, val) {
    if (val < 0) {
        val = length;
    } else if (val > length) {
        val = 0;
    }
    
    return val;
}