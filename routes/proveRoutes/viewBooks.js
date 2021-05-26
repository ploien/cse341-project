const path = require('path');
const express = require('express');

const rootDir = require('../../util/path');
const bookData = require('./create');

const proveRoutes = express.Router();

proveRoutes.post('/addBook', (req, res, next) => {
    const books  = bookData.bookSummaries;
    res.render('/pages/prove2/viewBooks', {
        books: books,
        path: 'proveActivities/viewBooks'
    });
});

module.exports = proveRoutes;