const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://omm3:omm3@omm3.ytqxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectToDB = () => {
    mongoose.connect(dbURI)
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .catch(err => console.log(err))
}

module.exports = connectToDB