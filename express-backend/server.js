const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('./logger.js');
const connectToDB = require('./db');
const userUpload = require('./routes/user');

const app = express();
const port = 5001 || process.env.PORT

app.use('/user', userUpload);

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*'); //website allowed to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Request methods allowed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //Request headers allowed
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger)
//connectToDB()


app.get("/", cors(), (req, res) => {
    res.send("Hello World.")
})


app.listen(port, () => console.log(`Server is running on ${port}`))