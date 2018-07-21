var mongoose = require('mongoose');
var Recurso = require('./Recurso')

var fonteInfoURLSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

module.exports = Recurso.discriminator('FonteInfoURL', fonteInfoURLSchema)