const Product = require('../../models/project01/product');
const { codePointAt } = require('../../util/path');

exports.getAddProduct = (req, res, next) => {
    res.render('pages/project01/addProduct', {
        pageTitle: 'Add Product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const productName = req.body.productName
    const itemDescription = req.body.itemDescription 
    const price = req.body.price
    const imageURL = req.body.productImage
    req.user.createProduct({
        productName: productName,
        itemDescription: itemDescription,
        price: price,
        imageURL: imageURL,
    })
    .then(result => {
        console.log(result);
        res.redirect('./adminProductList');
    })
    .catch(err => {console.log(err)})
};

exports.getAdminProductList = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('./pages/project01/adminProductList', {
                prods: products,
                pageTitle: 'Product List: Admin'
             }); 
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        res.render('pages/project01/editProduct', {
            pageTitle: 'Edit Product',
            product: product
        })
    })
    .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.id;
    const prodDescription = req.body.itemDescription;
    const prodName = req.body.productName;
    const prodPrice = req.body.price;
    const prodImage = req.body.productImage;
    Product.findByPk(prodId)
        .then(product => {
            product.productName = prodName;
            product.itemDescription = prodDescription;
            product.price = prodPrice;
            product.imageURL = prodImage;
            return product.save();
        })
        .then(result => {
            console.log('PRODUCT UPDATED');
            res.redirect('./adminProductList');
        })
        .catch(err => console.log(err))
    
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Product Deleted');
            res.redirect('./adminProductList');
        })
        .catch(err => console.log(err));
};
