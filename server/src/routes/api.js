const router = require('express').Router();
const formidable = require('formidable');
const path = require('path');
var fs = require('fs');

const db = require("../db");
const uploadsCol = db.collection("test-db");
const mongojs = require("mongojs");

var passport = require('passport');

//Get all the uploaded docs
/*router.get('/examples', passport.authenticate('projecto-jwt', {session: false}), (req, res, next) => {
  console.log("GET /examples")
  console.log(req)
  db.uploads.find((err, uploads) => {
    if (err) return res.status(500).json({ error: err });
    res.json(uploads);
  });
});*/

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
    form.multiples = true;
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
      var fileName = `${fields['docTag']}_${fields['userId']}_${new Date().getTime()}.${fileExt}`;
      fs.rename(file.path, path.join(form.uploadDir, fileName), function (err) {
        if (err) throw err;
        console.log('File Renamed.');
      });
      //Create data object to upload into db
      var data = { 
          docTag: fields.docTag,
          uploadInfo: {
              userId: fields.userId,
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

});

module.exports = router;