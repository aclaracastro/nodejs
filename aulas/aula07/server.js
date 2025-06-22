const http = require('node:http');

const PORTA = 5124;
const URL = 'localhost';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' }); //status 200 e o cabecalho de resposta
    res.end('<p>Habemus papa: Leão XIV</p>'); //resposta do servidor
});

server.listen(PORTA, URL, () => { //callback quando o servidor estiver online
    console.log(`Servidor online no endereço http://${URL}:${PORTA}/...`);
});