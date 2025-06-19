const fs = require('node:fs');

const streamLeitura = fs.createReadStream('log.txt', {encoding: 'utf-8', highWaterMark: 64 * 1024}); // 64 * 1024 bytes = 64 KB -> quando coloca 4 * 128 nao le o arquivo inteiro

streamLeitura.on('data', (vchunck) => {
    console.log('\n\tPedaço recebido: ', vchunck); 
});

streamLeitura.on('end', () => {
    console.log('Fim da leitura do arquivo.');
});

streamLeitura.on('error', (err) => {
    console.log('Ocorreu um erro ao processar o arquivo: ', err);
});

//node exemplo-stream.js