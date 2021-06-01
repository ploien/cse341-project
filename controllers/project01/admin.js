const { findById } = require('../../models/project01/product');
const Product = require('../../models/project01/product')

exports.getAddProduct = (req, res, next) => {
    res.render('pages/project01/addProduct', {
        pageTitle: 'Add Product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.productName, req.body.itemDescription, req.body.price, req.body.productImage);
    product.save();
    console.log(req.body);
    res.redirect('/project01/admin/addProduct');
};

exports.getAdminProductList = (req, res, next) => {

    Product.fetchAll(products =>{
        res.render('./pages/project01/adminProductList', {
            prods: products,
            pageTitle: 'Product List: Admin'
         }); 
    })
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('pages/project01/editProduct', {
            pageTitle: 'Edit Product',
            product: product
        })
    })
}
exports.postEditProduct = (req, res, next) => {

    findById
    product.save();
    console.log(req.body);
    res.redirect('/project01/admin/addProduct');
    };
