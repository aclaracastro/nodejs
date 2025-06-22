const express = require('express');
const rota = express.Router();

rota.get('/', (req, res, next) => { //resquest, response, next
  res.render('texto', {
    p1: 'Todavia, o julgamento imparcial das eventualidades deve passar por modificações independentemente das condições inegavelmente apropriadas.',
    p2: 'É importante questionar o quanto o aumento do diálogo entre os diferentes setores produtivos apresenta tendências no sentido de aprovar a manutenção dos relacionamentos verticais entre as hierarquias.',
    p3: 'É claro que o entendimento das metas propostas deve passar por modificações independentemente das regras de conduta normativas.'
  });
});

module.exports = rota;