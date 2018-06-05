var mongoose = require('mongoose');

var Utilizador = require('./Utilizador')
var Alteracao = require('./Alteracao')


var recursoSchema = new mongoose.Schema({
  versaoAnterior: {
    type: mongoose.Schema.ObjectId,
    ref: 'Recurso'
  },
  ultimaAlteracao: {
    type: mongoose.Schema.ObjectId,
    ref: 'Alteracao'
  },
  dataHoraCriacao: {
    type: Date,
    required: true
  },
  criador: {
    type: mongoose.Schema.ObjectId,
    ref: 'Utilizador',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  tags: [{
    type: mongoose.Schema.ObjectId, 
    //required: true
  }],
},{ 
  collection: 'recursos', 
  discriminatorKey: 'tipo'
});

module.exports = mongoose.model('Recurso', recursoSchema)