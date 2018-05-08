var passport = require("passport")
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var secret = 'projecto-app-secret';

//Load user model
var User = require('../logic/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = {
  getStrategy: () => {
    var options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    options.secretOrKey = secret;
    // JWT strategy checks for token in the Authorization header (JWT <token>)
    return new JwtStrategy(options, function(jwt_payload, done) {
      console.log('payload received', jwt_payload);
      // obter utilizador e colocar no pedido
      User.findOne( {_id: jwt_payload.id}, {password: true} , function(err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else return done(null, false, { msg: 'No such user.'});
      });
    });
  },
  getSecret: () => {
    return secret;
  }
};