const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const bookSummaries = []; //Variable to store book titles and summaries

router.get('/addBook', (req, res, next) => {
    res.render('addBook');
});

router.post('/addBook', (req, res, next) => {
    bookSummaries.push({title: req.body.title, summary: req.body.summary});
    console.log(bookSummaries);
    res.redirect('/viewBooks');
});

exports.bookSummaries = bookSummaries;
exports.routes = router;