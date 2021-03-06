var mongoose = require('mongoose');
var Recurso = require('./Recurso')

var recursoFicheiroSchema = new mongoose.Schema({
  extensao: {
    type: String,
    required: true
  },
  caminho: {
    type: String,
    required: true
  },
});

module.exports = Recurso.discriminator('RecursoFicheiro', recursoFicheiroSchema)