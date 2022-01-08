const mongoose = require('mongoose')
const schema = mongoose.Schema

let comment = new schema({
    meme: String,
    author: String,
    content: String,
    date: Date
})

const Comment = mongoose.model("Comment", comment)

module.exports = Comment