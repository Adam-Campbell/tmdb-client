// require necessary modules
const express = require('express');
const next = require('next');

// initialize app instance
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// set up routes
app.prepare()
.then(() => {
    // get server instance
    const server = express();

    // handle default movies route (popular movies)
    server.get('/movies', (req, res) => {
        const url = '/movies';
        const params = { subcategory: 'popular' };
        app.render(req, res, url, params);
    });

    // handle alternate movies routes 
    server.get('/movies/:subcategory', (req, res) => {
        const url = '/movies';
        const params = { subcategory: req.params.subcategory };
        app.render(req, res, url, params);
    });

    // handle default tv route (popular tv) 
    server.get('/tv', (req, res) => {
        const url = '/tv';
        const params = { subcategory: 'popular' };
        app.render(req, res, url, params);
    });

    // handle alternative tv routes
    server.get('/tv/:subcategory', (req, res) => {
        const url = '/tv';
        const params = { subcategory: req.params.subcategory };
        app.render(req, res, url, params);
    });

    // handle movie details route
    server.get('/movie/:id', (req, res) => {
        const url = '/movie';
        const params = { id: req.params.id };
        app.render(req, res, url, params);
    });

    // handle all routes that aren't explicitly defined
    server.get('*', (req, res) => handle(req, res));

    // start server
    server.listen(3000, err => {
        if (err) throw err;
        console.log('Ready on http://localhost:3000');
    });
})