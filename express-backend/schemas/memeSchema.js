const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    author: String,
    date: Date,
    name: String,
    template: String,
    text1: String,
    text2: String,
    text3: String,
    upVotes: Number,
    private: Boolean
})

const Meme = mongoose.model("Meme", meme)

module.exports = Meme