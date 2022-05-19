const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, err => {
  if (err) throw err;
  console.log('Folder was created');
});


fs.readdir(path.join(__dirname, 'files'), 'utf-8', (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach(file => {
      fs.copyFile(`${path.dirname(__filename)}/files/${file}`, `${path.dirname(__filename)}/files-copy/${file}`, err => {
        if (err) throw err;
      })
    });
  }
});