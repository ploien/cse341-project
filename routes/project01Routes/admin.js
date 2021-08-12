//This file holds all pages that will be used by only a page admin
const path = require('path'); 
const express = require('express');

//Passing in the path declared in path.js which will provide the complete path to this folder
const router = express.Router();

const adminController = require('../../controllers/project01/admin')
const isAuth = require('../../middleware/isAuth')

router.get('/addProduct', isAuth,  adminController.getAddProduct);

router.post('/addProduct', isAuth, adminController.postAddProduct);

router.get('/editProduct/:productId', isAuth, adminController.getEditProduct);

router.post('/editProduct', isAuth, adminController.postEditProduct);

router.get('/adminProductList', isAuth, adminController.getAdminProductList);

router.post('/deleteProduct',  isAuth, adminController.postDeleteProduct);

module.exports = router;