import fs from 'fs';

const getFiles = path =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });

export default getFiles;
