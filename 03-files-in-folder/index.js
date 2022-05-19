const fs = require('fs');
const path = require('path');
const {stat} = require('fs');


fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const pathFile = path.join(__dirname, `secret-folder/${file.name}`);
      if (file.isFile()) {
        stat(pathFile, (err, stats) => {
          if (err) {
            console.log(err);
          }
          console.log(`${file.name.split('.')[0]} - ${path.extname(pathFile).slice(1)} - ${stats.size / 1024}kb`);
        })
      }
    })
  }
})