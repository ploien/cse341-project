const router = require('express').Router();

router

    .use('/01', require('./ta01'))
    .use('/02', require('./ta02'))
    .use('/03', require('./ta03'))
    .use('/04', require('./ta04'))

    .get('/', (req, res, next) => {
        res.render('pages/teamActivities/', {
            pageTitle: 'Team Activities',
            path: '/teamActivities'
        });
    });

module.exports = router;