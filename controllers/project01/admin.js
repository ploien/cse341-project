const Product = require('../../models/project01/product')

exports.getAddProduct = (req, res, next) => {
    res.render('pages/project01/addProduct', {
        pageTitle: 'Add Product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.productName, req.body.itemDescription, req.body.price);
    product.save();
    console.log(req.body);
    res.redirect('/project01/admin/addProduct');
};