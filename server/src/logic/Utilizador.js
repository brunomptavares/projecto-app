var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var utilizadorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) { return validator.isEmail(email) },
      message: "O endereço de email não é válido."
    }
  },
  nAluno: {
    type: Number,
    required: true,
    unique: true
  },
  confianca: {
    default: 1,
    type: Number,
    required: true
  },
  favoritos: [{
    type: mongoose.Schema.ObjectId, 
    ref: 'Utilizador',
    validate: {
      validator: async function(categorias) {
        return 1
      },
      message: "A categoria antecessora referênciada não existe"
    }
    //required: true
  }]
},{ collection: 'utilizadores' });

utilizadorSchema.plugin(uniqueValidator, { message: 'Já existe um utilizador com o mesmo {PATH}.' });

utilizadorSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});


utilizadorSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Utilizador', utilizadorSchema);

