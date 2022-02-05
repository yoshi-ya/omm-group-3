const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    author: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
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
    votes: {
        type: [String],
        default: []
    },
    private: {
        type: Boolean,
        default: false
    },
    color: String,
    size: Number,
    transparency: Number,
    font: String
})

const Meme = mongoose.model("Meme", meme)

module.exports = Meme