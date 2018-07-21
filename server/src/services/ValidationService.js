var mongoose = require('mongoose')

module.exports = {
    validObjectId(string) {
      return mongoose.Types.ObjectId.isValid(string)
    },
    validNome(nome) {
      
    },
    validDescricao(descricao) {

    }
}