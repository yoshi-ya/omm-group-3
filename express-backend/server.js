const express = require('express');
const path = require('path');
const logger = require('./logger.js');
const connectToDB = require('./db');
const userUpload = require('./routes/user');

const app = express();
const port = process.env.PORT || 5001

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
require('./routes/commentRoutes.js')(app)
require('./routes/memeRoutes.js')(app)
require('./routes/templateRoutes.js')(app)
require('./routes/apiRoutes.js')(app)
require('./routes/upload_routes.js')(app)
connectToDB()

app.listen(port, () => console.log(`Server is running on ${port}`))
