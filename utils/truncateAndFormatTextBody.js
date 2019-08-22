import { truncateString } from './truncateString';

export function formatTextString(textString) {
    return textString.replace(/&amp;/g, '&')
            .split('\n')
            .filter(el => el !== '');
}

export function truncateTextStringIfNeeded(textString, shouldTruncate, truncationThreshold) {
    return shouldTruncate ? 
        truncateString(textString, truncationThreshold) :
        textString;
}

export function truncateAndFormatTextBody(textString, shouldTruncate, truncationThreshold) {
    return formatTextString(
        truncateTextStringIfNeeded(
            textString, 
            shouldTruncate, 
            truncationThreshold
        )
    );
}