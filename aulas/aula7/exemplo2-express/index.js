const express = require('express');
const app = express();
const PORTA = 5124;

app.get('/', (req, res) => { 
    res.send('<h3> a rota raiz usando o GET</h3>'); 
});

app.post('/teste-post', (req, res) => { 
    res.send('<h3>acessou a rota /teste-post usando o POST</h3>');
});

app.put('/teste-put', (req, res) => { 
    res.send('<h3>acessou a rota /teste-put usando o PUT</h3>'); 
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
    
