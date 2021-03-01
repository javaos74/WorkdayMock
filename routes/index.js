var express = require('express');
var fs  = require('fs');
var multer = require('multer');
var path = require('path');
var router = express.Router();



const storage = multer.diskStorage( {
  destination: function(req, file, cb) {
    cb(null, "upload/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname( file.originalname));
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Integrations/v34.1', (req, res) => {
  console.log( req.headers);
  fs.writeFileSync(path.join(__dirname, "../public/req.xml"), req.body);
  res.contentType("text/xml;charset=utf-8");
  res.sendFile("response.xml", {root: path.join(__dirname , "../public")});
});


module.exports = router;
