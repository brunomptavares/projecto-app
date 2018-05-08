//Imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const passport = require('passport');
const morgan = require('morgan');
const app = express();
const strategy = require('./config/passport-strategy').getStrategy();

//routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

//settings
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname,'/views'));

//load static folders
app.use(express.static(path.join(__dirname, '/views')));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); // url-encoded requests
//app.use(morgan('dev')); // log every request to the console
app.use(passport.initialize());

//routes
app.use(indexRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

//variables
global.uploadDir = path.join(__dirname, '../uploaded');

// load custom authentication strategy for passport
passport.use('projecto-jwt', require('./config/passport-strategy').getStrategy())

app.listen(app.get('port'), () => {
    console.log('Running on port ', app.get('port'));
});