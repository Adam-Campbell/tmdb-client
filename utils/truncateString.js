export function truncateString(string, threshold) {
    if (string.length <= threshold) return string;

    return string.slice(0, threshold - 3) + '...';
}