var passport = require("passport")
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var secret = 'projecto-app-secret';

//Load user model
var Utilizador = require('../logic/Utilizador');

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
    return new JwtStrategy(options, (jwt_payload, done) => {
      // obter utilizador e colocar no pedido
      Utilizador.findOne( {_id: jwt_payload.id}, {password: 0} , (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user);
        else return done(null, false, { message: 'Falha na autenticação.'});
      });
    });
  },
  getSecret: () => {
    return secret;
  }
};