const mongoose = require('mongoose')
const schema = mongoose.Schema

let comment = new schema({
    meme: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: Date
})

const Comment = mongoose.model("Comment", comment)

module.exports = Comment