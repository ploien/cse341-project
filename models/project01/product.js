const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../../util/project01/database').getDb;

// class Product {
//   constructor(productName, itemDescription, price, imageURL, id, userId) {
//     this.productName = productName;
//     this.itemDescription = itemDescription;
//     this.price = price;
//     this.imageURL = imageURL;
//     this._id = id
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => console.log(err))
//   }

//   static update(productId) {
//     const db = getDb();
//     return db.collection('products').find({ _id: new mongodb.ObjectID(productId) }).next()
//       .then(product.update())
//       .catch(err => console.log(err));
//   }

//   static findById(productId) {
//     const db = getDb();
//     return db.collection('products').find({ _id: new mongodb.ObjectID(productId) }).next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => console.log(err))
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products')
//       .find()
//       .toArray() //'find()' with no parameters returns all objects in the collection
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     const id = new mongodb.ObjectID(prodId);
//     return db.collection('products').deleteOne({_id: id});
//   }
// }

// module.exports = Product;