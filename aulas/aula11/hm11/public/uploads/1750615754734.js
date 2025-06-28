// Importa o módulo 'http' para criar um servidor web
const http = require('http');

// Define o hostname e a porta em que o servidor irá escutar
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Define o cabeçalho da resposta HTTP com status 200 e o conteúdo sendo do tipo JSON
  res.writeHead(200, { 'Content-Type': 'application/json' });
  // Envio um objeto JSON para o cliente
  res.end('{ "nome":"NodeJS Aula 1", "data":"10/04/2025" }')
});

// Inicia o servidor e o faz escutar na porta e hostname definidos
server.listen(port, hostname, () => {
  // Exibe uma mensagem no console indicando que o servidor está rodando
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});