const path = require('path');
const express = require('express');

const rootDir = require('../../util/path');

const proveRoutes = express.Router();
const bookSummaries = []; //Variable to store book titles and summaries

proveRoutes.post('/create', (req, res, next) => {
    bookSummaries.push({title: req.body.title, summary: req.body.summary});
    console.log(bookSummaries);
    res.redirect('/viewBooks');
});

exports.bookSummaries = bookSummaries;
exports.proveRoutes = proveRoutes;