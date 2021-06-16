const fs = require('fs');
const path = require('path');

const rootDir = require('../../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                console.log("ReadFile Error");
                 return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {console.log(err)});
        });
    }
    
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {

            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            else {
                console.log(err);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if(existingProduct) {
                updatedProduct = { ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
            fs.writeFile(p, JSON.stringify(cart), err => {console.log(err)});
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        })
    }
}