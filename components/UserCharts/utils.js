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

export function convertToChartData(ratingsData) {
    const chartData = Array.from({ length: 10 })
                           .map((el, index) => ({ rating: index + 1, frequency: 0 }));
    for (let ratingObj of ratingsData) {
        chartData[ratingObj.rating - 1].frequency++;
    }
    return chartData;
}

const genres = [
    { name: 'Action', id: 28 },
    { name: 'Action & Adventure', id: 10759 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Kids', id: 10762 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'News', id: 10763 },
    { name: 'Reality', id: 10764 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'Sci-Fi & Fantasy', id: 10765 },
    { name: 'Soap', id: 10766 },
    { name: 'Talk', id: 10767 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'War & Politics', id: 10768 },
    { name: 'Western', id: 37 }
];

const genresMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
}, {});

export function getPieData(entities) {
    // keeping this for later
    const len = entities.length;
    const threshold = 4;
    
    // Created an object where each key is a genre_id and the corresponding value is the number of times
    // that genre_id appears.
    const summed = entities.reduce((acc, entity) => {
        for (let genre of entity.genre_ids) {
            if (acc[genre]) {
                acc[genre]++;
            } else {
                acc[genre] = 1;
            }
        } 
        return acc;     
    }, {});

    
    // Creates an array where each element is an object with a 'genre' key equal to the name corrsponding to a
    // genre_id, and a 'frequency' key holding the number of times that genre_id appears. 
    let genresArr = [];
    for (let key in summed) {
        genresArr.push({
            genre: genresMap[key],
            frequency: summed[key]
        });
    }

    // Take every genre except for the top `threshold` (according to frequency) and combine them all into
    // an 'Other' category, then return the top `threshold` genres and the 'Other' category.
    const sorted = genresArr.sort((a,b) => b.frequency - a.frequency);
    const topGenres = sorted.slice(0, threshold);
    const totalOthers = sorted.slice(threshold).reduce((total, el) => (total + el.frequency), 0);
    return [
        ...topGenres,
        { genre: 'Others', frequency: totalOthers }
    ];
}