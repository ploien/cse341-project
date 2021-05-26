const path = require('path');
const express = require('express');

const rootDir = require('../../util/path');

const proveRoutes = express.Router();

proveRoutes.get('/', (req, res, next) => {
    res.render('pages/prove02/addBook',    {
        path: '/proveActivities'
    });
});

module.exports = proveRoutes;