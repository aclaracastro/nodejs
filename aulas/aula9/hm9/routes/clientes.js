var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

function carregaClientes() {
  var clientesPath = path.join(__dirname, '../public/clientes.json');
  var clientesData = fs.readFileSync(clientesPath);
  return JSON.parse(clientesData);
}

router.get('/', function(req, res, next) {
  var clientes = carregaClientes();
  res.json(clientes);
});

router.get('/:id', function(req, res) {
  const clientes = carregaClientes();
  const cliente = clientes.find(c => c.codigo == req.params.id);
  
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
});

router.delete('/:id', function(req, res) {
  const clientes = carregaClientes();
  const index = clientes.findIndex(c => c.codigo == req.params.id);
  
  if (index !== -1) {
    clientes.splice(index, 1);
    fs.writeFileSync(
      path.join(__dirname, '../public/clientes.json'),
      JSON.stringify(clientes, null, 2)
    );
    res.json({ mensagem: 'Cliente excluído com sucesso!' });
  } else {
    res.status(404).json({ mensagem: 'Cliente não existe.' });
  }
});

module.exports = router;