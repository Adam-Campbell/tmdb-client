export default function reducer(state, action) {
    switch (action.type) {

        case 'FETCH_DATA_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                mediaData: [ ...state.mediaData, ...action.payload.mediaData ],
                currentPage: state.currentPage + 1,
                isLoading: false
            };
    }
}