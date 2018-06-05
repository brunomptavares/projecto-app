var mongoose = require('mongoose');

var alteracaoSchema = new mongoose.Schema({
  utilizadorId: {
    type: mongoose.Schema.ObjectId,
    required:true
  },
  dataHora: {
    type: Date,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Alteracao', alteracaoSchema)
