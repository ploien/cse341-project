const Product = require('../../models/project01/product');
const Cart = require('../../models/project01/cart');
const User = require('../../models/project01/user');


exports.getHome = (req, res, next) => {
    res.render('pages/project01/home', {
        pageTitle: 'Home Page'
    })
};

exports.getProductList = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.render('./pages/project01/productList', {
                prods: products,
                pageTitle: 'Product List'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('pages/project01/product', {
                pageTitle: 'Product Details',
                product: product
            });
        })
        .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            console.log(cart);
        })
        .catch(err => console.log(err));
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, qty: cartProductData.qty })
    //             }
    //         }

    //         res.render('pages/project01/cart', {
    //             pageTitle: 'Shopping Cart',
    //             products: cartProducts
    //         });
    //     })
    // })

}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('./cart');
}

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.prodId;
    const productPrice = req.body.price;
    Cart.deleteProduct(productId, productPrice);
    res.redirect('./cart');
}

