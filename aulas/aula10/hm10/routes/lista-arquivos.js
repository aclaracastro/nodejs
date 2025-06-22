const express = require('express');
const router = express.Router();

const vlista = [
  { id: 1, nome: 'arquivo1.txt' },
  { id: 2, nome: 'arquivo2.txt' },
  { id: 3, nome: 'arquivo3.txt' },
  { id: 4, nome: 'arquivo4.txt' },
  { id: 5, nome: 'arquivo5.txt' }
];

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('lista-arquivos', {title: 'Lista de arquivos para download', arr_arquivos: vlista });
});

module.exports = router;
