var mongoose = require('mongoose');
var express = require('express');
var jwt = require('jsonwebtoken');
var secret = require('../config/passport-strategy').getSecret();
var router = express.Router();
var User = require("../logic/user");

router.post('/login', function(req, res) {
  console.log(req.body)
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) return res.status(500).json({success: false, msg: 'Authentication failed. User not found.'});
    if (!user) {
      return res.status(401).json({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // create JWT token, from now on we'll 
          var token = jwt.sign({id: user.id}, secret);
          // reply with jwt token to authenticate future requests
          // and userID to identify the user
          return res.json({success: true, msg: 'Authentication sucessfull.', jwtToken: "JWT " + token});
        } else {
          return res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
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