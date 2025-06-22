var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lista', {
    title: 'lista',
    cidade: ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'], 
    estados: ['RJ', 'SP', 'MG', 'PR', 'RS']
  });
});

module.exports = router;