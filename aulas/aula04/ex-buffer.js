const { Buffer } = require('buffer');

const meuBuffer = Buffer.alloc(15);
meuBuffer.write('Ana Clara');

console.log(`meuBuffer: ${meuBuffer.toString('hex')}`); //hexadecimal
console.log(`meuBuffer: ${meuBuffer.toString('utf8')}`); 
console.log(`meuBuffer: ${meuBuffer}`);
console.log(meuBuffer);

//node ex-buffer.js