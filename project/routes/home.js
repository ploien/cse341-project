//this will will be the initial home page with the navigation menu

const path = require('path'); 
const express = require('express');

//Passing in the path declared in path.js which will provide the complete path to this folder
const rootDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('home')
})

module.exports = router;
