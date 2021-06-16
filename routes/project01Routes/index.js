const routes = require('express').Router();
const path = require('path');

//route imports for project
const shop = require('./shop');
const admin = require('./admin');
const { static } = require('express');

routes.use(static(path.join(__dirname, 'public')));

routes.use(shop)
      .use('/admin', admin)
      .get('/', (req, res, next) => {
            res.render('pages/project01/home', {
                  path: '/project01'
            });
      });

const sequelize = require('../../util/project01/database');
const Product = require('../../models/project01/product');
const User = require('../../models/project01/user');
const Cart = require('../../models/project01/cart');
const CartItem = require('../../models/project01/cartItem');

routes.use(static(path.join(__dirname, 'public')));


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//adds user with Id 1 to the request
routes.use((req, res, next) => {
      User.findByPk(1)
            .then(user => {
                  req.user = user;
                  next();
            })
            .catch(err => console.log(err));
})

//Creates a dummy user if one isn't created yet
sequelize
      //.sync({force: true})
      .sync()
      .then(result => {
            //console.log(result);
            return User.findByPk(1)
      })
      .then(user => {
            if (!user) {
                  console.log("No User Found");
                  return User.create({ userName: 'Peter', email: 'test@test.com' })
            }
            return user;
      })
      .then(user => {
            //console.log(user);
            return user.createCart();
      })
      .then(cart => {
            console.log(cart);
      })
      .catch(err => console.log(err));

module.exports = routes;