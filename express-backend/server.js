const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('./logger.js');
const connectToDB = require('./db')

const app = express();
const port = process.env.PORT || 5001

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger)
connectToDB()


app.get("/", cors(), (req, res) => {
    res.send("Hello World.")
})


app.listen(port, () => console.log(`Server is running on ${port}`))