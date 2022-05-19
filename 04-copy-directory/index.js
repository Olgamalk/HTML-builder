const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, err => {
  if (err) throw err;
  console.log('Folder was created');
});