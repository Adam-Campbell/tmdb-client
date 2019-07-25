const router = require('express').Router();
const { normalizeUrl } = require('./utils');

function movieRoutes(app) {
    router.route('/:id')
        .get(normalizeUrl, (req, res) => {
            const url = '/movie';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/recommended')
        .get(normalizeUrl, (req, res) => {
            const url = '/movie/recommended';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/similar')
        .get(normalizeUrl, (req, res) => {
            const url = '/movie/similar';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/cast-and-crew')
        .get(normalizeUrl, (req, res) => {
            const url = '/movie/cast-and-crew';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/reviews')
        .get(normalizeUrl, (req, res) => {
            const url = '/movie/reviews';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })
    router.route('/:id/images')
        .get(normalizeUrl, (req, res) => {
            const url = '/movie/images';
            const params = { id: req.params.id };
            app.render(req, res, url, params);
        })

    return router;
}

module.exports = movieRoutes;