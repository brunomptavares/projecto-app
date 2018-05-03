const connectionString = 'mongodb://localhost:27017/test-db';

var mongojs = require('mongojs')
var mongoose = require('mongoose')

var db = mongojs(connectionString, ["uploads"])

mongoose.connect(connectionString)

module.exports = db;