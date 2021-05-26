const router = require('express').Router();

router

    .use('/viewBooks', require('./create'))
    .use('/addBook', require('./addBook'))
    .use('/viewBooks', require('./viewBooks'))

    .get('/', (req, res, next) => {
        res.render('pages/prove02', {
            pageTitle: 'Prove 02',
            path: '/proveActivities'
        })
    });



module.exports = router;