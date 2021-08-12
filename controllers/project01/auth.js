const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const User = require('../../models/project01/user');
const { compileClient } = require('pug');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('pages/project01/login', {
        pageTitle: 'Login',
        errorMessage: message
    })
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('pages/project01/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
    });

};

exports.getReset = (req, res, next) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('pages/project01/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('./login');
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        req.flash('error', 'Invalid email or password.');
                        return res.redirect('./login');
                    }
                    else {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        req.session.save((err) => {
                            res.redirect('./productList');
                        })
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/project01/');
    })
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Email address already exists, please pick a different address');
                return res.redirect('./signup');
            }
            else {
                return bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            email: email,
                            password: hashedPassword,
                            cart: { items: [] }
                        });
                        return user.save()
                    })
                    .then(result => {
                        res.redirect('./login');
                        return transporter.sendMail({
                            to: email,
                            from: 'ploien@hotmail.com',
                            subject: 'Signup Successful',
                            html: '<h1>You have successfully signed up</h1>'
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => console.log(err));
};

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne();
    })
}