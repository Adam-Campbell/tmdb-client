// require necessary modules
const express = require('express');
const next = require('next');
const parser = require('ua-parser-js');
const cookieParser = require('cookie-parser');

const apiRouter = require('./api');

// initialize app instance
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const axios = require('axios');


// set up routes
app.prepare()
.then(() => {
    // get server instance
    const server = express();

    server.use(cookieParser());
    server.use(express.json());
    // attach device info to all get requests
    server.get('*', (req, res, next) => {
        //console.log(req.cookies);
        const ua = parser(req.headers['user-agent']);
        const { type } = ua.device;
        req.isDevice = Boolean(type === 'mobile' || type === 'tablet');
        next();
    });

    server.use('/api', apiRouter);

    // handle all routes that aren't explicitly defined
    server.get('*', (req, res) => handle(req, res));

    // start server
    server.listen(3000, err => {
        if (err) throw err;
        console.log('Ready on http://localhost:3000');
    });
})