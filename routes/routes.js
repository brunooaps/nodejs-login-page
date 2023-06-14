const express = require('express')
const app = express()
const User = require('../models/User')
const router = require('express').Router()
const passport = require('passport')
const initializePassport = require("../passport-config")

router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

router.get('/find', async(req, res) => {
    try {
        const user = await User.find()
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})

router.get('/find/:id', async (req, res) => {

    const id = req.params.id

    try {
        const user = await User.findOne({_id: id})

        if (!user) {
            return res.status(422).json({message: "User not found"})
        }
        
        res.status(200).json(user)
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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

module.exports = router