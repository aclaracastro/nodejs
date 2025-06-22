const express = require('express');
const router = express.Router();
const path = require('node:path');

//path to where the files are stored on disk
const FILES_DIR = path.join(__dirname, '../public');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.download(FILES_DIR + '\\' + req.arquivo[0].nome, function (err) {
    if (!err) return; // file sent
    if (err.status !== 404) return next(err); // non-404 error
    // file for download not found
    res.statusCode = 404;
    res.send('Arquivo não encontrado!');
  });
});

module.exports = router;
