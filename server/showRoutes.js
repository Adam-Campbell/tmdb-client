const router = require('express').Router();
const { normalizeUrl } = require('./utils');

function showRoutes(app) {

    router.route('/:id')
        .get(normalizeUrl, (req, res) => {
            const url = '/show';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    
    router.route('/:id/recommended')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/recommended';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/similar')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/similar';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
        
    router.route('/:id/cast-and-crew')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/cast-and-crew';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/reviews')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/reviews';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/images')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/images';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/seasons')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/seasons';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    router.route('/:id/season/:number')
        .get(normalizeUrl, (req, res) => {
            const url = '/show/season';
            const params = { id: req.params.id, number: req.params.number };
            app.render(req, res, url, params);
        })
    
    return router;
}

module.exports = showRoutes;