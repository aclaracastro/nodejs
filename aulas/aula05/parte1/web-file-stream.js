import fs from 'fs';
import { pipeline } from 'node:stream/promises';

export async function downloadFile(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
  }

  const fileStream = fs.createWriteStream(outputPath);
  console.log(`Downloading file from ${url} to ${outputPath}`);

  await pipeline(response.body, fileStream);
  console.log('File downloaded successfully');
}

// export async function readFile(filePath) {
//   const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

//   try {
//     for await (const chunk of readStream) {
//       console.log('--- File chunk start ---');
//       console.log(chunk);
//       console.log('--- File chunk end ---');
//     }
//     console.log('Finished reading the file.');
//   } catch (error) {
//     console.error(`Error reading file: ${error.message}`);
//   }
// }