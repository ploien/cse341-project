//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/teamActivities/ta02', { 
        title: 'Team Activity 02', 
        path: 'teamActivities', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;