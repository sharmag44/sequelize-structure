const express = require('express');
const routes = require('../routes');
const path = require("path");
const app = express();
const { handleError } = require("../helpers/error")
app.use(express.json());

app.use('/api', routes);
app.use(function (err, req, res, next) {
    if (err) {
        res.log.error(err.stack);
        if (req.xhr) {
            res.send(500, { error: 'Something went wrong!' });
        } else {
            next(err);
        }

        return;
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS, PUT, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});


// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(handleError)
app.set('view engine', 'ejs');
const root = path.normalize(__dirname + './../');
app.set('views', path.join(root, 'views'));

module.exports = app;