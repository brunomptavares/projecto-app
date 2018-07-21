const router = require('express').Router();
const formidable = require('formidable');
const path = require('path');
var fs = require('fs');

const db = require("../db");
const uploadsCol = db.collection("test-db");
const mongojs = require("mongojs");
const mongoose = require('mongoose')

var passport = require('passport');

var Recurso = require('../logic/Recurso')
var RecursoFicheiro = require('../logic/RecursoFicheiro')
var Categoria = require('../logic/Categoria')

// Recursos API
router.get('/obterRecursos', (req, res, next) => {
  var populateQuery = [
    {path:'categorias', model: 'Categoria'}, 
    {path:'criador', model: 'Utilizador', select: "nome"}];
  Recurso.find({})
  .populate(populateQuery)
  .exec((err, recursos) => {
    if(err) return res.status(500).json(errorHandling(err))
    return res.json({success: true, recursos: recursos});
  });
})

// get recurso by id
router.get('/obterRecurso/:recursoId', (req, res, next) => {
  // check for valid recursoId
  if(!mongoose.Types.ObjectId.isValid(req.params.recursoId)) {
    return res.status(500).json({success: false, msg: "O id do recurso é inválido."});
  }
  // find recursoId in db
  Recurso.findOne({_id: mongojs.ObjectId(req.params.recursoId)})
  //populate with only necessary fields
  //.populate('criador', 'nome confianca')
  //.populate('categorias')
  //.populate('versaoAnterior')
  //.populate('ultimaAlteracao')
  .exec((err, recurso) => {
    if(err) return res.status(500).json(errorHandling(err))
    if(!recurso) return res.status(500).json({success: false, msg: "O recurso que procura não existe."});
    return res.json({success: true, recurso: recurso})
  })
});

router.get('/obterFavoritos', (req, res, next) => {
  passport.authenticate('projecto-jwt', {session: false}, (err, user, info) => {
    if(err) return res.status(500).json(errorHandling(err))
    // user not found
    if (!user) {
      return res.status(401).json({success: false, msg: "Acesso não autorizado. Faça a autenticação na aplicação."})
    }
    var populateQuery = [{path:'categorias', model: 'Categoria'}, {path:'criador', model: 'Utilizador', select: "nome"}];
    Recurso.find({_id: { $in: user.favoritos}})
    .populate(populateQuery)
    .exec((err, recursos) => {
      if(err) return res.status(500).json(errorHandling(err))
      return res.json({success: true, recursos: recursos});
    });
  })(req, res, next);
})

router.get('/obterRecursoFicheiro/:ficheiro', (req, res, next) => {
  // recursoId.jpeg,pdf...
  let caminho = path.join(global.uploadDir, req.params.ficheiro)
  if (fs.existsSync(caminho)) {
    return res.sendFile(caminho)
  } else {
    return res.status(500).json({success: false, msg: "O ficheiro não foi encontrado."})
  }
});

router.post('/adicionarRecurso', (req, res, next) =>  {
  passport.authenticate('projecto-jwt', {session: false}, function(err, user, info) {
    if(err) return res.status(500).json(errorHandling(err))
    // user not found
    if (!user) {
      return res.status(401).json({success: false, msg: "Acesso não autorizado. Faça a autenticação na aplicação."})
    }

    var form = new formidable.IncomingForm();
    //form.multiples = true;
    form.keepExtensions = true;
    form.type = "multipart";
    form.uploadDir = global.uploadDir

    //Before file is uploded
    form.onPart = function (part) {
      //Handle non file parts, the rest of the form fields
      if(!part.filename) {
          this.handlePart(part)
      //Handle file part and allowed extensions
      } else if(part.filename && part.filename.match(/\.(jpg|jpeg|png|pdf)$/i)) {
          this.handlePart(part);
      }
    };

    // parse the form and get fields and files
    form.parse(req, (err, fields, files) => {
      if(err) return res.status(500).json(errorHandling(err))
      // instantiate recurso
      var recurso = {
        _id: new mongojs.ObjectId(),
        dataHoraCriacao: new Date(),
        nome: fields.nome,
        descricao: fields.descricao,
        criador: user._id
      }
      // add categorias if they come in the form
      // parse the string to JSON and map the string array of ids to ObjectId
      if(fields.categorias) {
        recurso.categorias = JSON.parse(fields.categorias)/*.map(cat => { return new mongojs.ObjectId(cat._id) })*/
      }
      // type check
      if(!fields.tipo) recursoGenericoHandle(recurso, fields, res)
      if(fields.tipo==="RecursoFicheiro") recursoFicheiroHandle(recurso, fields, files, res)
    })
  })(req, res, next);
})

function recursoGenericoHandle(recurso, fields, res) {
  // Instantiate model
  var recursoGenerico = new Recurso(recurso)
  // Insert RecursoFicheiro to db
  console.log(recurso)
  recursoGenerico.save((err, recurso) => {
    if(err) return res.status(500).json(errorHandling(err))
    return res.json({success: true, recursoId: recurso._id, msg: "Recurso adicionado com sucesso."});
  });
}

function recursoFicheiroHandle(recurso, fields, files, res) {
  // error handling
  // Get file generate name
  var file = files['file'];
  if(!file) return res.status(500).json({success: false, msg: "O ficheiro não foi encontrado ou não possuí uma extensão válida."})
  var fileExt = file.path.split('.')[1];
  var fileName = `${recurso._id}.${fileExt}`;
  var filePath = path.join(this.uploadDir, fileName)
  // Add remaining fields for RecursoFicheiro
  recurso.extensao = fileExt
  recurso.caminho = fileName
  // Instantiate model
  var recursoFicheiro = new RecursoFicheiro(recurso)
  // Insert RecursoFicheiro to db
  recursoFicheiro.save((err, recurso) => {
    if(err) return res.status(500).json(errorHandling(err))
    // Rename file
    fs.rename(file.path, filePath, function(err) {
      if(err) return res.status(500).json(errorHandling(err))
    })
    return res.json({success: true, recursoId: recurso._id, msg: "Recurso adicionado com sucesso."});
  });
}

// Categorias API

// Returns all categories
/*router.get('/obterCategorias', function(req, res, next) {
  Categoria.find()
  .populate('criador', 'nome')
  .populate('ultimaAlteracao')
  .populate('relacionadas')
  //.populate('antecessora')
  //.populate('filhos')
  .exec((err, categorias) => {
    if (err) return res.status(500).json({success: false, msg: err});
    return res.json({success: true, categorias: categorias});
  });
})*/

// Returns only the parent categories
router.get('/obterCategorias', function(req, res, next) {
  Categoria.find({}, {nome: 1, descricao:1, antecessora:1, filhos:1, relacionadas:1})
  .exec((err, categorias) => {
    errorHandling(err)
    return res.json({success: true, categorias: categorias});
  });
})

// Add new category
router.post('/adicionarCategoria', function(req, res, next) {
  passport.authenticate('projecto-jwt', {session: false}, function(err, user, info) {
    errorHandling(err)
    // User not found
    if (!user) {
      return res.status(401).json({success: false, msg: "Acesso não autorizado. Faça a autenticação na aplicação."})
    }

    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      errorHandling(err)
      // Instantiate categoria model mandatory fields
      var categoria = new Categoria({
        _id: new mongojs.ObjectId(),
        nome: fields.nome,
        descricao: fields.descricao,
        criador: user._id,
        dataHoraCriacao: new Date(),
      })
      // Optional fields
      if(fields.abstracta) categoria.abstracta = fields.abstracta
      // Decode string to JSON and set the ID fields with ObjectId from mongo
      if(fields.antecessora) categoria.antecessora = new mongojs.ObjectId(JSON.parse(fields.antecessora))
      if(fields.relacionadas && fields.relacionadas.length > 0) categoria.relacionadas = JSON.parse(fields.relacionadas)
      // Save in database
      categoria.save((err, categoria) => {
        errorHandling(err)
        return res.json({success: true, categoria: categoria, msg: "Categoria adicionada com sucesso."});
      });
    })
  })(req, res, next);
})

function errorHandling (err) {
  if (err) {
    // mongoose error handling
    if(err.errors) {
      let keys = Object.keys(err.errors)
      if(err.errors[keys[0]].name === "ValidatorError") {
        return {success:false, msg:err.errors[keys[0]].message};
      } 
    }
    return {success: false, msg: err};
  } 
};

module.exports = router