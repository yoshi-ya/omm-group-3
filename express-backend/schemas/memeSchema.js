const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    author: String,
    date: Date,
    template: String,
    text1: String,
    text2: String,
    text3: String,
    text4: String,
    votes: Number,
    private: Boolean,
    color: String,
    size: Number,
    transparency: Number,
    font: String
})

const Meme = mongoose.model("Meme", meme)

module.exports = Meme