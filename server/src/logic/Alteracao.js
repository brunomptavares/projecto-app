var mongoose = require('mongoose');

var alteracaoSchema = new mongoose.Schema({
  utilizador: {
    type: mongoose.Schema.ObjectId,
    ref: 'Utilizador',
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
