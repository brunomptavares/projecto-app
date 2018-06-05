var mongoose = require('mongoose');
var Recurso = require('./Recurso')

var eventoSchema = new mongoose.Schema({
  dataHoraInicio: {
    type: Date,
    required: true
  },
  dataHoraFim: {
    type: Date,
    //required: true
  },
  recursos: [{
    type: mongoose.Schema.ObjectId, 
    //required: true
  }],
});

module.exports = Recurso.discriminator('tipoRecurso', eventoSchema)