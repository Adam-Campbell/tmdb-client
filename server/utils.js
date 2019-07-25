/**
 * Splitting the routes into separate files causes a discrepancy with the asPath value returned
 * by the Next JS router on client side vs server side. This function alter the url property on the
 * request object to resolve this issue.
 * 
 * See: https://github.com/zeit/next.js/issues/5901
 */
function normalizeUrl(req, res, next) {
    req.url = req.originalUrl;
    next();
}

module.exports = {
    normalizeUrl
}
