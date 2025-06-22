var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quem-somos', { 
    title: 'Quem somos' 
});
});

module.exports = router;