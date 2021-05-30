//this will will be the initial home page with the navigation menu

const path = require('path'); 
const express = require('express');

//Passing in the path declared in path.js which will provide the complete path to this folder
const router = express.Router();

const shopController = require('../../controllers/project01/shop');

router.get('/', shopController.getHome);

router.get('/productList', shopController.getProductList);

router.get('/product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

module.exports = router;
