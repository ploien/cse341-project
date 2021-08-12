
const express = require('express');
const router = express.Router();

const authController = require('../../controllers/project01/auth');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/signup', authController.postSignup);

module.exports = router;