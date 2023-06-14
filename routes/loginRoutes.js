const express = require('express')
const app = express()
const User = require('../models/User')
const router = require('express').Router()
const passport = require('passport')
const methodOverride = require('method-override')
const initializePassport = require("../passport-config")

initializePassport(passport)

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}

module.exports = router