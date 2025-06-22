const {Buffer } = require('node:buffer');

const buf1 = Buffer.alloc(10); // Cria um buffer de 10 bytes

const buf2 = Buffer.alloc(10, 1); // Cria um buffer de 10 bytes preenchido com o valor 1

const buf3 = Buffer.allocUnsafe(10); // Cria um buffer de 10 bytes sem inicializar, pode conter dados antigos

const buf4 = Buffer.from([1, 2, 3]); // Cria um buffer a partir de um array de bytes

const buf5 = Buffer.from([257, 257.5, -255, '1']); // Cria um buffer a partir de valores que serão truncados para o intervalo 0-255

const buf6 = Buffer.from('tést'); // Cria um buffer a partir de uma string, codificada em UTF-8

const buf7 = Buffer.from('tést', 'latin1'); // Cria um buffer a partir de uma string, codificada em Latin-1

console.log(`buf1 = ${buf1}`);
console.log(`buf2 = ${buf2}`);
console.log(buf1);
console.log(buf2);
console.log(`buf1 = ${buf1.toString()}`);
console.log(`buf2 = ${Number(buf2).toString()}`);
 
// Exibindo os buffers //node exemplo-buffer.js
console.log('buf1:', buf1);
console.log('buf2:', buf2);
console.log('buf3:', buf3);
console.log('buf4:', buf4);
console.log('buf5:', buf5);
console.log('buf6:', buf6);
console.log('buf7:', buf7);