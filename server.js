// require necessary modules
const express = require('express');
const next = require('next');
const parser = require('ua-parser-js');


// initialize app instance
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// set up routes
app.prepare()
.then(() => {
    // get server instance
    const server = express();

    function addDeviceInfo(req, res, next) {
        const ua = parser(req.headers['user-agent']);
        const { type } = ua.device;
        req.isDevice = Boolean(type === 'mobile' || type === 'tablet');
        next();
    }

    // handle default movies route (popular movies)
    server.get('/movies', addDeviceInfo, (req, res) => {
        const url = '/movies';
        const params = { subcategory: 'popular' };
        app.render(req, res, url, params);
    });

    // handle alternate movies routes 
    server.get('/movies/:subcategory', addDeviceInfo, (req, res) => {
        const url = '/movies';
        const params = { subcategory: req.params.subcategory };
        app.render(req, res, url, params);
    });

    // handle default tv route (popular tv) 
    server.get('/tv', addDeviceInfo, (req, res) => {
        const url = '/tv';
        const params = { subcategory: 'popular' };
        app.render(req, res, url, params);
    });

    // handle alternative tv routes
    server.get('/tv/:subcategory', addDeviceInfo, (req, res) => {
        const url = '/tv';
        const params = { subcategory: req.params.subcategory };
        app.render(req, res, url, params);
    });

    // handle movie details main route
    server.get('/movie/:id', addDeviceInfo, (req, res) => {
        const url = '/movie';
        const params = { id: req.params.id };
        app.render(req, res, url, params);
    });

    // handle the movie details recommended movies route
    server.get('/movie/:id/recommended', addDeviceInfo, (req, res) => {
        const url = '/movie/recommended';
        const params = { id: req.params.id };
        app.render(req, res, url, params);
    });

    // handle the movie details similar movies route
    server.get('/movie/:id/similar', addDeviceInfo, (req, res) => {
        const url = '/movie/similar';
        const params = { id: req.params.id };
        app.render(req, res, url, params);
    });

    // handle the movie details cast and crew route
    server.get('/movie/:id/cast-and-crew', addDeviceInfo, (req, res) => {
        const url = '/movie/cast-and-crew';
        const params = { id: req.params.id };
        app.render(req, res,url, params);
    });

    // handle tv show details route
    server.get('/show/:id', addDeviceInfo, (req, res) => {
        const url = '/show';
        const params = { id: req.params.id };
        app.render(req, res, url, params);
    });

    // handle person details route
    server.get('/person/:id', addDeviceInfo, (req, res) => {
        const url = '/person';
        const params = { id: req.params.id };
        app.render(req, res, url, params);
    });

    // handle all routes that aren't explicitly defined
    server.get('*', addDeviceInfo, (req, res) => handle(req, res));

    // start server
    server.listen(3000, err => {
        if (err) throw err;
        console.log('Ready on http://localhost:3000');
    });
})