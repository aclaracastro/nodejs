const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Upload de Arquivos',
    message: null,
    file: null
  });
});

router.post('/upload', upload.single('file'), function(req, res, next) {
  if (!req.file) {
    return res.render('index', {
      title: 'Upload de Arquivos',
      message: 'Nenhum arquivo foi enviado!',
      success: false,
      file: null
    });
  }

  res.render('index', {
    title: 'Upload de Arquivos',
    message: 'Arquivo enviado com sucesso!',
    success: true,
    file: req.file
  });
});

module.exports = router;