import { flow, partial, partialRight, reduce, orderBy } from 'lodash';

/**
 * Takes the combined_credits data structure provided by TMdb and returns as an array either the cast 
 * credits, the crew credits or both, depending on the value of the roleType argument. 
 * @param {String} roleType - either 'cast', 'crew' or 'both'
 * @param {Object} combinedCredits - an object containing cast and crew credits arrays. 
 * @returns {Array} - the array of credits 
 */
function filterForRoleType(roleType, combinedCredits) {
    switch (roleType) {
        case 'both':
            return [
                ...combinedCredits.cast,
                ...combinedCredits.crew
            ];
        case 'cast':
            return combinedCredits.cast;
        case 'crew':
            return combinedCredits.crew;
        default:
            return [
                ...combinedCredits.cast,
                ...combinedCredits.crew,
            ]
    }
}

/**
 * Takes an array of credits and filters them down to just the tv credits, just the movie credits, or
 * both, depending on the value of the mediaType argument. 
 * @param {String} mediaType - either 'movie', 'tv' or 'both'
 * @param {Array} creditsArr - the array of credits to be filtered
 * @returns {Array} - the filtered credits array
 */
function filterForMediaType(mediaType, creditsArr) {
    switch (mediaType) {
        case 'both':
            return creditsArr;
        case 'movie':
            return creditsArr.filter(credit => credit.media_type === 'movie');
        case 'tv':
            return creditsArr.filter(credit => credit.media_type === 'tv');
        default:
            return creditsArr;
    }
}

/**
 * Takes a date string and returns the year as a number, or just returns null if there was no date string.
 * @param {?String} dateString - the string from which to derive the year
 * @returns {?Number} the year derived from the date string 
 */
function getYear(dateString) {
    if (!dateString) return null;
    return new Date(dateString).getFullYear();
}

/**
 * Takes a credit object and transforms it into a consistent shape, ensuring that each pertinent piece of 
 * information has a consistent key to be looked up with (ie release_date and first_air_date both become
 * releaseYear) and all irrelevant pieces of information are discarded. 
 * @param {Object} cr - the credit object
 * @returns {Object} - the transformed credit object
 */
function transformCredit(cr) {
    return {
        mediaId: cr.id,
        creditId: cr.credit_id,
        mediaType: cr.media_type,
        releaseYear: getYear(cr.release_date || cr.first_air_date),
        name: cr.title || cr.name,
        averageRating: cr.average_rating || null,
        creditDescription: cr.character ? `as ${cr.character}` : (cr.job || null)
    }
}

/**
 * The itaree for a reduce operation. When utilised it will result in an array of credit objects being
 * transformed into an object where each key is a year, and the value is an object with the shape: 
 * {
 *      releaseYear {Number} - the release year
 *      credits: [{Object}] - an array of credit objects with the corresponding releaseYear
 * }
 * @param {Object} acc - the accumulator object 
 * @param {Object} credit - the current credit object to be processed
 * @returns {Object} - the result of the current reduction 
 */
function transformAndGroupReducer(acc, credit) {
    const tCredit = transformCredit(credit);
    if (acc[tCredit.releaseYear]) {
        acc[tCredit.releaseYear].credits.push(tCredit);
    } else {
        acc[tCredit.releaseYear] = {
            releaseYear: tCredit.releaseYear,
            credits: [ tCredit ]
        }
    }
    return acc;
}

/**
 * A composition using all of the above functions in order to transform the raw combined_credits data into a 
 * usable form.
 * @param {Object} combinedCredits - the raw combined credits data for the person in question 
 * @param {String} roleType - 'cast', 'crew' or 'both' 
 * @param {String} mediaType - 'movie', 'tv' or 'both' 
 */
export function transformCreditsData(combinedCredits, roleType, mediaType) {
    return flow(
        // use either the cast or crew array, or both
        partial(filterForRoleType, roleType),
        // filter to just tv or movie credits, or include both
        partial(filterForMediaType, mediaType),
        // sort all elements by release date in descending order
        partialRight(orderBy, el => new Date(el.release_date || el.first_air_date), ['desc']),
        // transform all credits into a consistent shape and group by release year
        partialRight(reduce, transformAndGroupReducer, {}),
        // ensure that the returned array is sorted according to the releaseYear in descending order
        partialRight(orderBy, el => el.releaseYear, ['desc'])
    )(combinedCredits);
}