export function getSSRHeaders(reqObject) {
    return reqObject ? {
        cookie: reqObject.headers.cookie
    } :
    {};
}