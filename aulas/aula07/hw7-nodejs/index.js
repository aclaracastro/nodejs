const express = require('express'); // importação da framework
const app = express(); // invocação para a framework para uso
const PORTA = 3000; // porta de saida

app.get('/', (req, res) => {
    res.send(`
        <h1>Teste de acesso usando Express.</h1>
        <br><br>
         <form action="/teste-post" method="post">
            <label for="nome">Seu nome:</label>
            <input type="text" id="nome" name="nome" required>
            <br>
            <label for="nome">Sua idade:</label>
            <input type="text" id="idade" name="idade" required>
            <br><br>
            <button type="submit">Enviar</button>
        </form> 
    `)
});

app.post('/teste-post', (req, res) => {
    req.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        const dados = chunk.toString().split('&');
        const nome  = dados[0].split('=')[1];
        const idade  = dados[1].split('=')[1];
        res.send(`<h3>Seu nome Senhor(a): ${nome.replace('+',' ')}</h3>
            <h3>Sua idade: ${idade}</h3>`);
    });
});

app.put('/teste-put', (req, res) => { //so aceita o verbo put
    req.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        const dados = chunk.toString().split('=');
        const vemail  = dados[1];
        res.send(`<h3>E-mail: ${vemail}</h3>`);
    });
}); 

app.listen(PORTA, () => {
    console.log(`Servidor online usando a porta ${PORTA}`)
});