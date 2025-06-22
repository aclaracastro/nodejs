var express = require('express');
var router = express.Router();
const createError = require('http-errors');

/* GET home page. */
router.get('/:termo', (req, res, next) => {
  const termo = req.params.termo;

  if(termo.length >5) {
    return next(createError(400, 'Termo muitoooo grande!'));
  }

  res.send(`Termo:  ${termo}`);
});

module.exports = router;
