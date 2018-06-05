var mongoose = require('mongoose');
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../config/passport-strategy').getSecret();
var router = express.Router();
var Utilizador = require("../logic/Utilizador");

router.post('/login', function(req, res) {
  Utilizador.findOne({username: req.body.username}, function(err, user) {
    if (err) return res.status(500).json({success: false, msg: 'A autenticação falhou.'});
    if (!user) {
      return res.status(401).json({success: false, msg: 'A autenticação falhou. O username não foi encontrado.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // create JWT token, from now on we'll 
          var token = jwt.sign({id: user.id}, secret);
          // reply with jwt token to authenticate future requests
          // and userID to identify the user
          return res.json({success: true, msg: 'Autenticação concluída com sucesso.', jwtToken: "JWT " + token});
        } else {
          return res.status(401).json({success: false, msg: 'A autenticação falhou. A password está errada.'});
        }
      });
    }
  });
});

router.post('/register', function(req, res) {
  console.log(req.body)
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    console.log(newUser)
    // save the user
    newUser.save(function(err) {
      if (err) return res.json({success: false, msg: 'Username already exists.'});
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;