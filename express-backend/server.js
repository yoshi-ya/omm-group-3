const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('./logger.js');

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger)


app.get("/", cors(), (req, res) => {
    res.send("Hello World.")
})


app.listen(port, "localhost", () => console.log(`Server is running on ${port}`))