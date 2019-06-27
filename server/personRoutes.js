const router = require('express').Router();

function personRoutes(app) {
    router.route('/:id')
        .get((req, res) => {
            const url = '/person';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/images')
        .get((req, res) => {
            const url = '/person/images';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/credits')
        .get((req, res) => {
            const url = '/person/credits';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    
    return router;
}

module.exports = personRoutes;