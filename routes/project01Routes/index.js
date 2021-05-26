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



module.exports = routes;