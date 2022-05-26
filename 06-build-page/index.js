const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components');

fs.mkdir(dist, {recursive: true}, err => {
  if (err) throw err;
});

const stylesProject = path.join(__dirname, 'styles');
const bundleStyle = path.resolve(__dirname, 'project-dist', 'style.css');
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

fs.mkdir(path.join(dist, 'assets'), {recursive: true}, err => {
   if (err) throw err;
});

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, folders) => {
   if (err) throw err;
   folders.forEach(folder => {
      fs.mkdir(path.join(dist, 'assets', `${folder.name}`), {recursive: true}, err => {
         if (err) throw err;
      });
      fs.readdir(`${path.join(__dirname, 'assets', `${folder.name}`)}`, {withFileTypes: true}, (err, files) => {
         if (err) throw err;
         files.forEach(file => {
            fs.copyFile(`${path.join(__dirname, 'assets', `${folder.name}`, `${file.name}`)}`, `${path.join(dist, 'assets', `${folder.name}`, `${file.name}`)}`, (err) => {
               if (err) throw err;
            })
         })
      })
   })
})

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, template) => {
   if (err) {
      throw err;
   } else {
      fs.writeFile(path.join(dist, 'index.html'), template, 'utf-8', (err) => {
         if(err) throw err;
      });
      fs.readFile(path.join(dist, 'index.html'), 'utf-8', (err, dataHTML) => {
         if(err) {
            throw err;
         } else {
            fs.readdir(components, (err, files) => {
               if(err) {
                  throw err;
               } else {
                  files.forEach(file => {
                     let filePath = path.join(components, file);
                     let fileName = file.split('.')[0];
                     fs.readFile(filePath, 'utf-8', (err, data) => {
                        if (err) throw err;
                        dataHTML = dataHTML.replace(new RegExp(`{{${fileName}}}`, 'g'), data);
                        fs.writeFile(path.join(dist, 'index.html'), dataHTML, 'utf-8', (err) => {
                           if(err) throw err;
                        })
                     })
                  })
               }
            })
         }
      })
   }   
});


