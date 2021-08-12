const routes = require('express').Router();
const path = require('path');

const csrf = require('csurf');

const User = require('../../models/project01/user');


//route imports for project
const shop = require('./shop');
const admin = require('./admin');
const auth = require('./auth');
const static = require('express');

const csrfProtection = csrf();

routes.use(csrfProtection);

routes.use((req, res, next) => {
      if (req.session.user) {
            User.findById(req.session.user._id)
                  .then(user => {
                        req.user = user;
                        next();
                  })
                  .catch(err => console.log(err));
      } else {
            next();
      }
})

routes.use((req, res, next) => {
      res.locals.isAuthenticated = req.session.isLoggedIn;
      res.locals.csrfToken = req.csrfToken();
      next();
})

routes.use(static(path.join(__dirname, 'public')));


//use all routes in the 'shop' folder and 'admin' folder
routes.use(auth);
routes.use(shop);
routes.use('/admin', admin) //Append string 'admin' to all routes in the admin folder
      .get('/', (req, res, next) => {
            res.render('pages/project01/home', {
                  path: '/project01',
                  pageTitle: 'Home Page'
            });
      });

module.exports = routes;