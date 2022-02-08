const mongoose = require('mongoose')
const schema = mongoose.Schema

let meme = new schema({
    author: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    date: Date,
    templates: [{url: String, x: Number, y: Number, width: Number, height: Number}],
    texts: [{text: String, x: Number, y: Number}],
    canvasWidth: Number,
    canvasHeight: Number,
    color: String,
    size: Number,
    votes: {
        type: [String], default: []
    },
    private: {
        type: Boolean, default: false
    }
})

const Meme = mongoose.model("Meme", meme)

module.exports = Meme