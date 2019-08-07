export function truncateString(string, threshold) {
    if (!string) {
        return '';
    } else if (string.length <= threshold) {
        return string;
    } else {
        return string.slice(0, threshold - 3) + '...';
    } 
}