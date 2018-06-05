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

// Recurso API
router.get('/obterRecursos', function(req, res, next) {
  Recurso.find().populate('criador').populate('ultimaAlteracao').exec((err, recursos) => {
    if (err) return res.status(500).json({success: false, msg: err});
    return res.json({success: true, recursos: recursos});
  });
})

// get recurso by id
router.get('/obterRecurso/:recursoId', (req, res, next) => {
  // check for valid recursoId
  if(!mongoose.Types.ObjectId.isValid(req.params.recursoId)) {
    return res.status(500).json({success: false, msg: "O id do recurso não é válido."});
  }
  // find recursoId in db
  Recurso.findOne({_id: mongojs.ObjectId(req.params.recursoId)})
  .populate('criador')
  .populate('versaoAnterior')
  .populate('ultimaAlteracao')
  .exec((err, recurso) => {
    if(!recurso) return res.status(500).json({success: false, msg: "O recurso que procura não existe."});
    // remove password from recurso
    recurso.criador.set('password', null);
    return res.json({success: true, recurso: recurso})
  })
});

router.post('/adicionarRecurso', function(req, res, next) {
  passport.authenticate('projecto-jwt', {session: false}, function(err, user, info) {
    if (err) { return res.status(500).json({success: false, msg: err}); }
    // user not found
    if (!user) {
      return res.status(401).json({success: false, msg: "Acesso não autorizado. Faça log-in na aplicação."})
    }

    var form = new formidable.IncomingForm();
    //form.multiples = true;
    form.keepExtensions = true;
    form.type = "multipart";
    form.extError = ""
    form.uploadDir = global.uploadDir

    //Before file is uploded
    form.onPart = function (part) {
      //Handle non file parts, the rest of the form fields
      if(!part.filename) {
          this.handlePart(part)
      //Handle file part and allowed extensions
      } else if(part.filename && part.filename.match(/\.(jpg|jpeg|png|pdf)$/i)) {
          this.handlePart(part);
      } else this.extError = "Extensão de ficheiro não permitida." ;
    };

    form.parse(req, (err, fields, files) => {
      console.log(fields)
      // successfull authorization
      req.logIn(user, function(err) {
        if (err) return res.status(500).json({success: false, msg: err});
        // instantiate recurso
        var recurso = {
          _id: new mongojs.ObjectId(),
          dataHoraCriacao: new Date(),
          nome: fields.nome,
          descricao: fields.descricao,
          criador: user._id
        }
        // type check
        if(fields.tipoRecurso==="RecursoFicheiro") {
          // error handling
          if (this.extError) return res.status(500).json({success: false, msg: extError});
          // returns err if recursoFicheiro was not inserted into db
          let err = recursoFicheiroHandle(recurso, fields, files)
          if (!err) return res.json({success: true, recursoId: recurso._id, msg: "Recurso adicionado com sucesso."});
          return res.status(500).json({success: false, msg: err});
        }
      })
    })
  })(req, res, next);
})

function recursoFicheiroHandle(recurso, fields, files) {
  // get file generate name
  var file = files['file'];
  var fileExt = file.type.split('/')[1];
  var fileName = `${recurso._id}_${fields.tipoRecurso}.${fileExt}`;
  var filePath = path.join(this.uploadDir, fileName)
  // add remaining fields for RecursoFicheiro
  recurso.tipoFicheiro = fileExt
  recurso.caminhoFicheiro = filePath
  // instantiate model
  var recursoFicheiro = new RecursoFicheiro(recurso)
  // insert RecursoFicheiro to db
  recursoFicheiro.save((err, recurso) => {
    // rename file
    fs.rename(file.path, filePath, function (err) { if (err) return err; });
    // send response to client
    return err
  });
}




/*
//Get all the uploaded docs
router.get('/examples', function(req, res, next) {
  passport.authenticate('projecto-jwt', {session: false}, function(err, user, info) {
    if (err) { return res.status(500).json({success: false, msg: err}); }
    // user not found
    if (!user) {
      // info object has the message for unauthorized access from the passport-strategy
      return res.status(401).json({success: false, msg: "Unauthorized access. Please log in."})
    }
    // successfull authorization
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // query db for examples
      db.uploads.find((err, uploads) => {
        if (err) return res.status(500).json({success: false, msg: err});
        return res.json({success: true, examples: uploads});
      });
    });
  })(req, res, next);
})

//Get especific file image
router.get('/examplesFile/:id', (req, res, next) => {
  db.uploads.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, example) => {
    if (err) return res.status(500).json({ error: err });
    else if(example == null) return res.status(500).json({ error: "Example not found" });
    console.log(example)
    res.sendFile(path.join(__dirname, '/../../uploaded', `/${example.uploadInfo.fileName}`));
  });
});


//Form and file upload
router.post('/examples', (req, res, next) => {

    var form = new formidable.IncomingForm();
    //form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = global.uploadDir;
    form.type = "multipart";

    var extError = null;

    //Filter for only 1 file????
    form.parse(req, (err, fields, files) => {
      //Error handling
      if (extError) return res.status(500).json({ error: extError });
      else if (err) return res.status(500).json({ error: err });
      //Get file and rename it
      var file = files['file'];
      var fileExt = file.type.split('/')[1];
      var fileName = `${fields['docTag']}_${fields['utilizadorId']}_${new Date().getTime()}.${fileExt}`;
      fs.rename(file.path, path.join(form.uploadDir, fileName), function (err) {
        if (err) throw err;
        console.log('File Renamed.');
      });
      //Create data object to upload into db
      var data = { 
          docTag: fields.docTag,
          uploadInfo: {
              utilizadorId: fields.utilizadorId,
              dateTime: new Date(),
              fileName: fileName
          }
      };
      //Upload to db
      db.uploads.insert(data, (err,test) => {
        if (err) return next(err);
        res.status(200).json({ uploadedToDatabase: true, data: data });
      });
    });

    //Before file is uploded
    form.onPart = function (part) {
      //Handle non file parts, the rest of the form fields
      if(!part.filename) {
          this.handlePart(part)
      //Handle file part and allowed extensions
      } else if(part.filename && part.filename.match(/\.(jpg|jpeg|png|pdf)$/i)) {
          this.handlePart(part);
      } else extError = "File extension not allowed" ;
    };

});*/

module.exports = router;