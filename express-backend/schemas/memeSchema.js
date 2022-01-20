const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    author: String,
    date: Date,
    template: {
        type: Buffer,
        required: true
    },
    text1: {
        type: String,
        required: true
    },
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