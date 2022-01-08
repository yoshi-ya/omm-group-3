const mongoose = require('mongoose')
const schema = mongoose.Schema

let user = new schema({
    email: String,
    username: String,
    password: String
})

const User = mongoose.model("User", user)

module.exports = User