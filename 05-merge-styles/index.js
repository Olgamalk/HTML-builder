const fs = require('fs');
const path = require('path');

const stylesProject = path.join(__dirname, 'styles');
const bundleStyle = path.resolve(__dirname, 'project-dist', 'bundle.css');
const bundle = fs.createWriteStream(bundleStyle);

fs.readdir(stylesProject, {withFileTypes: true}, (err, files) => {
   if(err) {
      throw err;
   } else {
      files.forEach(file => {
         let pathName = path.extname(path.join(stylesProject, file.name)).replace('.', '');
         if (file.isFile() && pathName === 'css') {
            const readStream = fs.createReadStream(path.join(stylesProject, file.name));
            readStream.pipe(bundle);
         }
      })
   }
});