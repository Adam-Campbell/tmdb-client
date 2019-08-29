export function getSSRHeaders(reqObject) {
    return (reqObject && reqObject.headers && reqObject.headers.cookie) ? {
        cookie: reqObject.headers.cookie
    } :
    {};
}