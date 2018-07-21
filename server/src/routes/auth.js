var mongoose = require('mongoose');
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../config/passport-strategy').getSecret();
var router = express.Router();
var Utilizador = require("../logic/Utilizador");

router.post('/login', function(req, res) {
  Utilizador.findOne({nome: req.body.nome}, function(err, user) {
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
  var newUser = new Utilizador({
    nome: req.body.nome,
    password: req.body.password,
    nAluno: req.body.nAluno,
    email: req.body.email
  });
  // save the user
  newUser.save(function(err) {
    if (err) {
      return res.status(401).json({success: false, msg: Object.values(err.errors)[0].message});
    }
    return res.json({success: true, msg: 'Utilizador criado com sucesso.'});
  });
});

module.exports = router;