
const Product = require('../../models/project01/product');
const Order = require('../../models/project01/order');



exports.getHome = (req, res, next) => {
    res.render('pages/project01/home', {
        pageTitle: 'Home Page',
    })
};

exports.getProductList = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('./pages/project01/productList', {
                prods: products,
                pageTitle: 'Product List',
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('pages/project01/product', {
                pageTitle: 'Product Details',
                product: product,
            });
        })
        .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items
            res.render('pages/project01/cart', {
                pageTitle: 'Shopping Cart',
                products: products,
            });
        })
        .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        req.user.addToCart(product);
        res.redirect('./productList');
    })
        .catch(err => {
            console.log(err);
        })
    // let fetchedCart;
    // let newQuantity = 1;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({ where: { id: prodId } })
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         if (product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return fetchedCart.addProduct(product, {
    //                 through: { quantity: newQuantity }
    //             });
    //         }
    //         return Product.findByPk(prodId)
    //             .then(product => {
    //                 return fetchedCart.addProduct(product,
    //                     { through: { quantity: newQuantity } });
    //             })
    //             .catch(err => console.log(err));
    //     })
    //     .then(() => {
    //         res.redirect('./productList');
    //     })
    //     .catch(err => console.log(err))
}

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.prodId
    req.user
        .removeCartItem(productId)
        .then(result => {
            res.redirect('./cart');
        })
        .catch(err => console.log(err));
}

exports.postCreateOrder = (req, res, next) => {

    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            user.clearCart();
            return order.save();
        })
        .then(result => {
            res.redirect('./orders')
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
        .then(orders => {
            res.render('pages/project01/orders', {
                pageTitle: 'Your Orders',
                orders: orders,
            });
        })
        .catch(err => console.log(err));
}