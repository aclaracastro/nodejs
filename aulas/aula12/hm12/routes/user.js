const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = require('../db');

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const usuario = await db.oneOrNone('SELECT * FROM usuario_imc WHERE id = $1', [userId]); 

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    const alturaMetros = usuario.altura / 100;
    const imc = (usuario.peso / (alturaMetros * alturaMetros)).toFixed(2);

    res.render('usuario', {
      title: 'Dados do Usuário',
      usuario,
      imc
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).send('Erro ao buscar usuário');
  }
});


module.exports = router;