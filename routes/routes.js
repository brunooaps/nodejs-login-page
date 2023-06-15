const User = require('../models/User')
const router = require('express').Router()

router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

router.get('/find', async(req, res) => {
    try {
        const users = await User.find()
        
        res.render('users.ejs', {users})
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})

router.get('/profile', checkAuthenticated, (req, res) => {
    res.render('profile.ejs', {name: req.user.name, email: req.user.email, sex: req.user.sex})
})

router.get('/developed', checkAuthenticated, (req, res) => {
    res.render('developed.ejs')
})

router.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

module.exports = router