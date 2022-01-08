const mongoose = require('mongoose')

const connectToDB = () => {
    mongoose
        .connect("mongodb://localhost/omm3")
        .then(() => console.log("Connected to Mongo Database"))
        .catch(err => console.error(err))
}

module.exports = connectToDB