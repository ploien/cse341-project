const router = require('express').Router();

router
    .use('/addBook', require('./addBook'))
    .use('/viewBooks', require('./viewBooks'))
    .use('/create', require('./create').proveRoutes)

    .get('/addBook', (req, res, next) => {
        res.render('pages/prove02/addBook', {
            pageTitle: 'Prove 02',
            path: '/proveActivities'
        })
    });



module.exports = router;