const router = require('express').Router();

function showRoutes(app) {
    router.route('/:id')
        .get((req, res) => {
            const url = '/show';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    // more subroutes to be added later
    
    return router;
}

module.exports = showRoutes;