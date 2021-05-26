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
    console.log("This will be a list of products")
    
};

