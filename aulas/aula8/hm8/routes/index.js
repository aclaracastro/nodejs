var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    frase_titulo: 'Dever de casa',
    p1: 'Testes com template engina Jade'
  });
});

module.exports = router;
