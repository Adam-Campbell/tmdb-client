
/*

Inputs:
- req object
- res object
- an object of key value pairs where the key is an HTTP method and the value is the handling function
for that method. 

This function should return a function that can be used as the main route handling function for a route,
so it must accept req and res objects, and perform all necessary logic for that route. 


*/

export function apiMethodHandler(methods) {
    const allowedMethods = Object.keys(methods).join(', ');
    return async function routeHandler(req, res) {
        if (typeof methods[req.method] === 'function') {
            methods[req.method](req, res);
        } else {
            console.log(`The method was ${req.method} but we don't allow that here`);
            res.setHeader('Allow', allowedMethods)
            res.status(405).end();
        }
        
    }
}
