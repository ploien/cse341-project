const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const bookData = require('./addBook');

const router = express.Router();

router.get('/viewBooks', (req, res, next) => {
    const books  = bookData.bookSummaries;
    res.render('viewBooks', {
        books: books,
        path: '/viewBooks'
    });
});

module.exports = router;