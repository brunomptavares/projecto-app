//Imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const app = express();

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
app.use(express.urlencoded({extended: false}));

//routes
app.use(indexRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

//variables
global.uploadDir = path.join(__dirname, '../uploaded');

//auth
const authCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https:///.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/",
    algorithms: ['RS256']
  });

app.listen(app.get('port'), () => {
    console.log('Running on port ', app.get('port'));
});