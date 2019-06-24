const router = require('express').Router();

function personRoutes(app) {
    router.route('/:id')
        .get((req, res) => {
            const url = '/person';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    // more subroutes to be added later
    
    return router;
}

module.exports = personRoutes;