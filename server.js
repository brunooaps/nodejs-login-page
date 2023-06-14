if (process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const routes = require('./routes/routes')

app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('', routes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gnoxui6.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log(('mongoDB connected'))
    })
    .catch((err) => console.log(err))

