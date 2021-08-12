const Product = require('../../models/project01/product');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('../login');
    }
    res.render('pages/project01/addProduct', {
        pageTitle: 'Add Product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const productName = req.body.productName
    const itemDescription = req.body.itemDescription
    const price = req.body.price
    const imageURL = req.body.productImage
    const product = new Product({
        productName: productName,
        itemDescription: itemDescription,
        price: price,
        imageURL: imageURL,
        userId: req.user
    })
    product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('./adminProductList');
        })
        .catch(err => { console.log(err) })
};

exports.getAdminProductList = (req, res, next) => {
    Product.find()
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
    Product.findById(prodId)
        .then(product => {
            res.render('pages/project01/editProduct', {
                pageTitle: 'Edit Product',
                product: product
            })
        })
        .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.id;
    const productName = req.body.productName;
    const itemDescription = req.body.itemDescription;
    const price = req.body.price;
    const imageURL = req.body.productImage;
    Product.findById(productId)
        .then(product => {
            product.productName = productName;
            product.itemDescription = itemDescription;
            product.price = price;
            product.imageURL = imageURL;
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
    Product.findByIdAndDelete(prodId)
        .then(result => {
            console.log('Product Deleted');
            res.redirect('./adminProductList');
        })
        .catch(err => console.log(err));
};
