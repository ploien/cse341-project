const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    resetToken: String,
    resetTokenExpiration: Date, 
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }]
    }
});

userSchema.methods.addToCart = function (product) {
    let cartProductIndex;
    if (this.cart.items) { //Check if there are items in the cart
        cartProductIndex = this.cart.items.findIndex(cp => { //search items array in cart to see if the item to be added 
            return cp.productId.toString() === product._id.toString();                   //already exists in the cart. Returns -1 if not found
        });
    } else { //If there are no items in the cart
        const newCart = {       //create new items array and put it in a cart
            items: [{
                productId: product._id,
                quantity: 1
            }]
        };

        this.cart = newCart;
        return this.save();
    }

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];  //Set new array with data from cart.items array.

    if (cartProductIndex >= 0) {                                            //If product exists in cart
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;       //Add 1 to quantity
        updatedCartItems[cartProductIndex].quantity = newQuantity;          //Set the new quantity for the item in the updated cart
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        }); //else push new item to updated cart
    }

    const updatedCart = {
        items: updatedCartItems //Set items array of a new cart to the updated cartItems array
    };

    this.cart = updatedCart;
    return this.save();

}

userSchema.methods.removeCartItem = function (productId) {

    const newItems = this.cart.items.filter(cartProduct => { //Get index for product in cart
        return cartProduct.productId.toString() !== productId.toString();
    });

    this.cart.items = newItems;
    return this.save();
}

userSchema.methods.clearCart = function () {

    this.cart.items = []; //Set cart items array to empty array
    return this.save()
}

module.exports = mongoose.model('User', userSchema);




// const mongodb = require('mongodb');
// const getDb = require('../../util/project01/database').getDb;

// const ObjectID = mongodb.ObjectID;

// class User {

//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             dbOp = db
//                 .collection('users')
//                 .updateOne({ _id: new ObjectID(this._id) }, { $set: this });
//         } else {
//             dbOp = db.collection('users').insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => console.log(err))
//     }

//     deleteCartItem(productId) {
//         const newItems = this.cart.items.filter(cartProduct => { //Get index for product in cart
//             return cartProduct.productId.toString() !== productId.toString();
//         });

//         const db = getDb();
//         return db.collection('users').updateOne({ _id: new ObjectID(this._id) }, { $set: { cart: { items: newItems } } })
//     }

//     addToCart(product) {
//         let cartProductIndex;
//         if (this.cart.items) { //Check if there are items in the cart
//             cartProductIndex = this.cart.items.findIndex(cp => { //search items array in cart to see if the item to be added 
//                 return cp.productId.toString() === product._id.toString();                   //already exists in the cart. Returns -1 if not found
//             });
//         } else { //If there are no items in the cart
//             const newCart = {       //create new items array and put it in a cart
//                 items: [{
//                     productId: new ObjectID(product._id),
//                     quantity: 1
//                 }]
//             };

//             const db = getDb();
//             return db
//                 .collection('users')
//                 .updateOne({ _id: new ObjectID(this._id) }, { $set: { cart: newCart } }) //Set the users cart to the new cart
//         }

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];  //Set new array with data from cart.items array.

//         if (cartProductIndex >= 0) {                                            //If product exists in cart
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;       //Add 1 to quantity
//             updatedCartItems[cartProductIndex].quantity = newQuantity;          //Set the new quantity for the item in the updated cart
//         } else {
//             updatedCartItems.push({
//                 productId: new ObjectID(product._id),
//                 quantity: newQuantity
//             }); //else push new item to updated cart
//         }

//         const updatedCart = {
//             items: updatedCartItems //Set items array of a new cart to the updated cartItems array
//         };

//         const db = getDb();
//         return db
//             .collection('users')
//             .updateOne({ _id: new ObjectID(this._id) }, { $set: { cart: updatedCart } }) //Set the users cart to the new cart
//     }

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         });
//         return db.collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p, quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     }
//                 })
//             });
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').findOne({ _id: new ObjectID(userId) })
//             .then(user => {
//                 console.log(user);
//                 return user;
//             })
//             .catch(err => console.log(err))
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart().
//             then(products => {
//                 console.log(this);
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new ObjectID(this._id),
//                         name: this.name,
//                     }
//                 }
//                 return db
//                     .collection('orders')
//                     .insertOne(order)
//             })
//             .then(result => {
//                 this.cart = { items: [] };
//                 return db
//                     .collection('users')
//                     .updateOne(
//                         { _id: new ObjectID(this._id) },
//                         { $set: { cart: { items: [] } } }
//                     )

//             })
//     }

//     getOrders() {
//         const db = getDb();
//         console.log(this._id);
//         return db
//             .collection('orders')
//             .find({'user._id': new ObjectID(this._id)})
//             .toArray();
//     }
// }

// module.exports = User;