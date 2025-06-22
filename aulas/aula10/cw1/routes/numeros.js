var express = require('express');
var router = express.Router();
const createError = require('http-errors');

/* GET home page. */
router.get('/:num', (req, res, next) => {
  const num = parseInt(req.params.num);

  if(isNaN(num)|| num > 100) {
    return next(createError(400, 'Número inválido!'));
  }

  res.send(`Número:  ${num}`);
});

module.exports = router;