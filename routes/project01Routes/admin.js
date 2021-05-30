//This file holds all pages that will be used by only a page admin
const path = require('path'); 
const express = require('express');

//Passing in the path declared in path.js which will provide the complete path to this folder
const router = express.Router();

const adminController = require('../../controllers/project01/admin')

router.get('/addProduct', adminController.getAddProduct);

router.post('/addProduct', adminController.postAddProduct);

router.get('/edit', adminController.getEdit)

module.exports = router;