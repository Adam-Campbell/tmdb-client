const router = require('express').Router();

function showRoutes(app) {
    router.route('/:id')
        .get((req, res) => {
            const url = '/show';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    
        router.route('/:id/recommended')
        .get((req, res) => {
            const url = '/show/recommended';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/similar')
        .get((req, res) => {
            const url = '/show/similar';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/cast-and-crew')
        .get((req, res) => {
            const url = '/show/cast-and-crew';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/reviews')
        .get((req, res) => {
            const url = '/show/reviews';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/images')
        .get((req, res) => {
            const url = '/show/images';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/seasons')
        .get((req, res) => {
            const url = '/show/seasons';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/season/:number')
        .get((req, res) => {
            const url = '/show/season';
            const params = { id: req.params.id, number: req.params.number };
            app.render(req, res, url, params);
        })
    // more subroutes to be added later

    
    return router;
}

module.exports = showRoutes;