const express = require('express'); // Importa o framework 
const app = express(); //chama o express para criar uma aplicação
const PORTA = 3000; // define a porta do servidor

app.get('/', (req, res) => { // define a rota raiz
    res.send('<h1>Teste de acesso usando express</h1>'); //resposta do servidor
});

app.listen(PORTA, () => { //callback quando o servidor estiver online
    console.log(`Servidor online usando a porta ${PORTA}`);
}); //inicia o servidor na porta definida
