const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const { hashPassword } = require('../bcrypt');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  res.render('cadastro', { 
    title: 'Cadastro de Usuários',
    message: null,
    error: null
  });
});

router.post('/', upload.single('foto'), async (req, res) => {
  const { nome, email, senha } = req.body;
  const foto = req.file ? '/uploads/' + req.file.filename : null;

  if (!nome || !email || !senha) {
    return res.render('cadastro', {
      title: 'Cadastro de Usuários',
      error: 'Nome, e-mail e senha são obrigatórios.',
      message: null
    });
  }

  try {
    const usuarioExistente = await db.oneOrNone('SELECT * FROM usuarios WHERE email = $1', [email]);
    
    if (usuarioExistente) {
      return res.render('cadastro', {
        title: 'Cadastro de Usuários',
        error: 'E-mail já cadastrado',
        message: null
      });
    }
    
    const hashedPassword = await hashPassword(senha);
    
    await db.none(
      'INSERT INTO usuarios(nome, email, senha, foto) VALUES($1, $2, $3, $4)',
      [nome, email, hashedPassword, foto]
    );
    
    res.redirect('/login?success=Cadastro realizado com sucesso! Faça login.');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.render('cadastro', {
      title: 'Cadastro de Usuários',
      error: 'Erro ao cadastrar usuário. Tente novamente.',
      message: null
    });
  }
});

module.exports = router;