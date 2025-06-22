var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', nome: 'Ana', nasc: '21/05/2004', vemail: 'teste@gmail.com' });
});

module.exports = router;
