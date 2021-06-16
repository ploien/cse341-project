const routes = require('express').Router();
const path = require('path');

//route imports for project
const shop = require('./shop');
const admin = require('./admin');
const { static } = require('express');
const sequelize = require('../../util/project01/database');

const Product = require('../../models/project01/product');
const User = require('../../models/project01/user');

routes.use(static(path.join(__dirname, 'public')));

routes.use(shop)
      .use('/admin', admin)
      .get('/', (req, res, next) => {
            res.render('pages/project01/home', {
                path: '/project01'
            });
      });

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

routes.use((req, res, next) => {
      User.findByPk(1)
      .then(user => {
            req.user = user;
            next();
      }) 
      .catch(err => console.log(err));
})
sequelize.sync()
         .then(result => {
            //console.log(result);
            return User.findByPk(1)
         })
         .then(user => {
            if (!user) {
               console.log("No User Found");
               return User.create({userName: 'Peter', email: 'test@test.com'})
            }
            return user;
         })
         .then(user => {
            //console.log(user);
         })
         .catch(err => console.log(err));

module.exports = routes;