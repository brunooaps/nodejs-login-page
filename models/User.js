const mongoose = require('mongoose')

const User = mongoose.model('Peoples', {
    name: String,
    email: String,
    password: String,
    active: Boolean
})

module.exports = User