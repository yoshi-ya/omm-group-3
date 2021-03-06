const mongoose = require('mongoose')
const schema = mongoose.Schema

let template = new schema({
    author: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: Date,
    image: {
        type: Buffer,
        required: true
    },
    private: {
        type: Boolean,
        default: false
    }
})

const Template = mongoose.model("Template", template)

module.exports = Template