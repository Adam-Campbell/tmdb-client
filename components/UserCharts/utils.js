/**
 * Get the numeric values to use as ticks for an axis. The range is 1 to maxVal.
 * @param {Number} maxVal - the maximum value you need to represent
 * @param {Number} targetSteps - the number of ticks you don't want to exceed (although it can go over
 * by 1).
 * @returns {Array} - the array of tick numbers
 */
export function getNumericTicks(maxVal, targetSteps) {
    const interval = Math.ceil(maxVal / targetSteps);
    const numOfIntervals = Math.ceil(maxVal / interval);
    return Array.from({ length: numOfIntervals }).map((el, idx) => {
        return (idx+1) * interval;
    });
}