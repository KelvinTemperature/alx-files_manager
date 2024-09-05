import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export function cipherTextToPlaintext(cipherText) {
    return Buffer.from(cipherText, 'base64').toString('utf-8');
}

export async function saveToLocalFileSystem(filename, data) {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        console.error(`An error while writing the data: ${err.message}`);
        return false;
      }
      return true;
    });
  
    return true;
}

export function generateUuid() {
  return uuidv4();
}
