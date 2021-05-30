const Product = require('../../models/project01/product')

exports.getHome = (req, res, next) => {
    res.render('pages/project01/home', {
        pageTitle: 'Home Page'
    })
};

exports.getProductList = (req, res, next) => {

    Product.fetchAll(products =>{
        res.render('./pages/project01/productList', {
            prods: products,
            pageTitle: 'Product List'
         }); 
    })
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        console.log(product);
        res.render('pages/project01/product', {
            pageTitle: 'Product Details',
            product: product
        })
    })
};

exports.getCart = (req, res, next) => {
    res.render('pages/project01/cart', {
        pageTitle: 'Shopping Cart'
    })
}

