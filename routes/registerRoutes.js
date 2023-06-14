const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register.ejs')
})

//Register new user
router.post('/', async (req, res) => {
    const {name, email, sex, pass} = req.body

    if (!name) {
        return res.status(422).json({ message: "Name is required" });
    }

    if (!email) {
        return res.status(422).json({ message: "Email is required" });
    }

    if (!sex) {
        return res.status(422).json({ message: "Sex is required" });
    }
    
    const active = true
    const saltRounds = 10; // Número de saltos (salt rounds) para gerar o salt
    const password = await bcrypt.hash(pass, saltRounds);

    const user = {
        name, 
        email,
        sex,
        password,
        active
    }

    try {
        
        await User.create(user)

        res.status(201).json({message: 'User created'})
        res.redirect('/login');

    } catch (error) {
        res.status(500).json({error: error})
    }

    console.log(user)
})

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }

//     res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }

//     next()
// }

module.exports = router