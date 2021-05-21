const path = require('path');
const express = require('express');

const rootDir = require('../../util/path');
const bookData = require('./create');

const proveRoutes = express.Router();

proveRoutes.get('/viewBooks', (req, res, next) => {
    const books  = bookData.bookSummaries;
    res.render('/pages/prove02/viewBooks', {
        books: books,
        path: '/prove02'
    });
});

module.exports = proveRoutes;