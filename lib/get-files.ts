import { readdir } from 'fs';

const getFiles = (path: string): Promise<Array<string>> =>
  new Promise((resolve, reject) => {
    readdir(path, (err, files) => {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });

export default getFiles;
