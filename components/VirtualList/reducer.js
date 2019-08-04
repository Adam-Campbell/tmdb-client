function getPrevWindow(window) {
    return window[0] - 10 >= 0
        ? window.map(i => i - 10)
        : window;
}

function getNextWindow(window) {
    return window[1] + 10 <= 60
        ? window.map(i => i + 10)
        : window;
}

export function reducer(state, action) {
    switch (action.type) {
        case 'PAGE_FORWARDS':
            const newWindow = getNextWindow(state.currentWindow);
            return {
                ...state,
                currentWindow: newWindow,
                furthestWindow: newWindow[0] > state.furthestWindow[0]
                                ? newWindow
                                : state.furthestWindow
            };

        case 'PAGE_BACKWARDS':
            return {
                ...state,
                currentWindow: getPrevWindow(state.currentWindow),
            };

        default:
            return state;
    }
}

function _getCardData(totalCards) {
    return Array.from({ length: totalCards })
                .map((el, idx) => {
                    const cardNum = idx + 1;
                    const pageNum = Math.ceil(cardNum / 20);
                    const positionInPage = cardNum - (pageNum - 1) * 20;
                    return {
                        id: cardNum,
                        description: `This is card ${positionInPage} from page ${pageNum}, it is card ${cardNum} overall`
                    };
                });
}

export function getCardData(pageNum) {
    return Array.from({ length: 20 })
            .map((el, idx) => {
                const cardNum = Math.max(pageNum - 1, 0) * 20 + idx + 1;
                const positionInPage = idx + 1;
                return {
                    id: cardNum,
                    description: `This is card ${positionInPage} from page ${pageNum}, it is card ${cardNum} overall`
                } 
            })
}