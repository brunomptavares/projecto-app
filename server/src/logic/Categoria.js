var mongoose = require('mongoose');
var mongojs = require('mongojs');

var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var categoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required:true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  descricao: {
    type: String
  },
  criador: {
    type: mongoose.Schema.ObjectId,
    ref: 'Utilizador',
    required: true
  },
  dataHoraCriacao: {
    type: Date,
    required: true  
  },
  ultimaAlteracao: {
    type: mongoose.Schema.ObjectId,
    ref: 'Alteracao',
  },
  abstracta: {
    type: Boolean,
    default: false
  },
  antecessora: {
    type: mongoose.Schema.ObjectId,
    ref: 'Categoria',
    validate: {
      validator: async function(antecessora) {
        //Check for valid ObjectId
        if(!mongoose.Types.ObjectId.isValid(antecessora)) return false;
        // Count number of objects with that id
        var c = 0
        // Async operation counting items in database, we must wait for the result
        await this.model('Categoria').count({_id: mongojs.ObjectId(antecessora)}, (err, count) => { 
          if(err) return err;
          console.log(count)
          c = count;
        })
        // More than zero results means the category exists, therefore is valid
        return c > 0
      },
      message: "A categoria-antecessora referênciada não existe"
    }
  },
  filhos: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Categoria'
  }],
  relacionadas: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Categoria',
  }]
},{ 
  collection: 'categorias', 
});

categoriaSchema.plugin(uniqueValidator, { message: 'Já existe uma categoria com o mesmo {PATH}.' });

categoriaSchema.post('save', function(categoria, next) {
  // After category is saved in database we need to update children on parent category
  if(categoria.antecessora) {
    this.model('Categoria').updateOne({_id: mongojs.ObjectId(categoria.antecessora)},{$addToSet:{filhos:categoria._id}}).exec((err, categoriaPai) => {
      if(err) return next(err)
    })
  }
  return next()
});

module.exports = mongoose.model('Categoria', categoriaSchema)
