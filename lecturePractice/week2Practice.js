
const path = require('path'); //Importing Global HTTP module
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const expressApp = express();

expressApp.use(bodyParser.urlencoded({extended: false}));

expressApp.use('/admin', adminRoutes);
expressApp.use(shopRoutes);

expressApp.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

expressApp.listen(5000);
