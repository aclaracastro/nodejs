const http = require('node:http');
const url = require('node:url');
const path = require('node:path');
const fs = require('node:fs');
const { downloadFile } = require('./web-file-stream');

const fileUrl = 'https://www.gutenberg.org/files/2701/2701-0.txt';
const outputFilePath = path.join(process.cwd(), 'moby.md');

const server = http.createServer(
    async (req, res) => {
        const urlAcessada = url.parse(req.url).pathname;
    
    switch(urlAcessada){
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("TESTE TESTE TESTE");
            res.end();
            break;
        case "/hello":
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<h1>hello world</h1>");
            res.end();
            break;
        case "/book":
            try {
                await downloadFile(fileUrl, outputFilePath);
                
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write("<h1>Reading file from stream...</h1>");
                
                const readStream = fs.createReadStream(outputFilePath, { encoding: 'utf8' });
                
                console.log('Started reading the file.');
                
                readStream.on('data', (chunk) => {
                    res.write('<br><strong>--- File chunk start ---</strong><br><pre>');
                    res.write(chunk);
                    res.write('</pre><br><strong>--- File chunk end ---</strong>');
                });
                
                readStream.on('end', () => {
                    console.log('Finished reading the file.');
                    res.write('<p><strong>Finished reading the file.</strong></p>');
                    res.end();
                });
            } catch (error) {
                res.write('<p><strong>Erro interno. Ver log no console do servidor.</strong></p>');
                console.error(`Error: ${error.message}`);
                res.end();
            }
            break;        
        default:
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<p><strong>you're boring</strong></p>");
            res.end();
        }
    }
);

server.listen(3001,'127.0.0.1',()=>{
    console.log('Listening on 127.0.0.1:3001');
});