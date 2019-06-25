export function formatMinutes(totalMins) {
    const remainder = totalMins % 60;
    const minutes = remainder > 9 ? remainder : `0${remainder}`;
    const hours = Math.floor(totalMins / 60);
    return `${hours}hr ${minutes}m`;
}