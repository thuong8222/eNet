export function GetObjectProperty(obj, prop, defaultValue = '') {
    try {
            if (obj === '' || obj === null || typeof obj === 'undefined') return defaultValue;
            if (obj[prop] === '' || obj[prop] === null || typeof obj[prop] === 'undefined') return defaultValue;
            return obj[prop];
    }
    catch (err) { }
    return defaultValue;
}
export function ShortNumber(num) {
    if (num === '' || num === null || typeof num === 'undefined') return '';

    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
}