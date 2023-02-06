export function normalizePort(val: string) {
    let num = parseInt(val, 10);

    if (isNaN(num)) {
        return val;
    }

    if (num >= 0) {
        return num;
    }

    return false;
}