var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Categoria = require('./Categoria')

var recursoSchema = new mongoose.Schema({
  versaoAnterior: {
    type: mongoose.Schema.ObjectId,
    ref: 'Recurso'
  },
  ultimaAlteracao: {
    type: mongoose.Schema.ObjectId,
    ref: 'Alteracao',
  },
  dataHoraCriacao: {
    type: Date,
    required: true
  },
  criador: {
    type: mongoose.Schema.ObjectId,
    ref: 'Utilizador',
    required: [true, 'É necessário referênciar um utilizador']
  },
  nome: {
    type: String,
    required: [true, "O campo 'nome' é de preenchimento obrigatório"],
    unique: true,
    uniqueCaseInsensitive: true
  },
  descricao: {
    type: String,
    required: [true, "O campo 'descrição' é de preenchimento obrigatório"]
  },
  categorias: [{
    type: mongoose.Schema.ObjectId, 
    ref: 'Categoria',
    validate: {
      validator: async function(categoriaId) {
        // Check for valid ObjectId
        // field name is categorias but only checks one at a time
        if(!mongoose.Types.ObjectId.isValid(categoriaId)) return false
        // Count number of ids
        var c = 0
         // Async operation counting items in database, we must wait for the result
        await this.model('Categoria').count({_id: categoriaId}, (err, count) => { 
          if(err) return err;
          c = count;
        })
        // More than zero results means the category exists, therefore is valid
        return c > 0
      },
      message: "Uma das categorias relacionadas referênciada não existe"
    }
    //required: true
  }]
},{ 
  collection: 'recursos', 
  discriminatorKey: 'tipo'
});

recursoSchema.plugin(uniqueValidator, { message: 'Já existe um recurso com o mesmo {PATH}.' });

module.exports = mongoose.model('Recurso', recursoSchema)