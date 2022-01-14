const express = require('express');
const path = require('path');
const logger = require('./logger.js');
const connectToDB = require('./db')

const app = express();
const port = process.env.PORT || 5001

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger)
require('./routes.js')(app)
connectToDB()

app.listen(port, () => console.log(`Server is running on ${port}`))