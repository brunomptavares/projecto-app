var mongoose = require('mongoose');
var Recurso = require('./Recurso')

var recursoFicheiroSchema = new mongoose.Schema({
  tipoFicheiro: {
    type: String,
    required: true
  },
  caminhoFicheiro: {
    type: String,
    required: true
  },
});

module.exports = Recurso.discriminator('RecursoFicheiro', recursoFicheiroSchema)