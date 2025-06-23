const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const requireLogin = require('../routes/middlewares/auth');
const multer = require('multer');
const path = require('path');

// Configuração do Multer para postagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/postagens/'); // Pasta específica para fotos de postagens
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'postagem-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Erro: Apenas imagens JPEG, JPG ou PNG são permitidas!');
    }
  }
});

router.get('/create', requireLogin, async (req, res) => {
  try {
    const usuarios = await db.any('SELECT id, nome FROM usuario WHERE ativo = true');
    res.render('postagem/create', { usuarios });
  } catch (error) {
    res.render('postagem/create', { error: 'Erro ao carregar usuários' });
  }
});

router.post('/create', [
  requireLogin,
  upload.single('foto_postagem'), // Middleware do Multer para processar o upload
  check('titulo').notEmpty().withMessage('Título é obrigatório'),
  check('descricao').notEmpty().withMessage('Descrição é obrigatória'),
  check('cod_usuario').notEmpty().withMessage('Usuário é obrigatório')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const usuarios = await db.any('SELECT id, nome FROM usuario WHERE ativo = true');
    return res.render('postagem/create', { usuarios, errors: errors.array() });
  }

  const { titulo, descricao, cod_usuario } = req.body;
  const id = uuidv4();
  const foto = req.file ? '/uploads/postagens/' + req.file.filename : null;
  
  try {
    await db.none(
      `INSERT INTO postagem(id, titulo, descricao, dt_cadastro, ativo, cod_usuario, foto) 
       VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [id, titulo, descricao, new Date(), true, cod_usuario, foto]
    );
    res.redirect(`/postagem/${id}`);
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    const usuarios = await db.any('SELECT id, nome FROM usuario WHERE ativo = true');
    res.render('postagem/create', { 
      usuarios, 
      error: 'Erro ao criar postagem',
      formData: req.body // Mantém os dados do formulário em caso de erro
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postagem = await db.one('SELECT * FROM postagem WHERE id = $1', [req.params.id]);
    const usuario = await db.one('SELECT * FROM usuario WHERE id = $1', [postagem.cod_usuario]);
    const comentarios = await db.any(
      'SELECT c.*, u.nome as usuario_nome FROM comentario c JOIN usuario u ON c.cod_usuario = u.id WHERE c.cod_postagem = $1',
      [req.params.id]
    );
    
    res.render('postagem/detalhes', { 
      postagem, 
      usuario, 
      comentarios,
      helpers: {
        displayPhoto: (foto) => foto ? foto : '/images/default-post.jpg'
      }
    });
  } catch (error) {
    console.error('Erro ao carregar postagem:', error);
    res.status(404).render('error', { 
      message: 'Postagem não encontrada',
      error
    });
  }
});

module.exports = router;