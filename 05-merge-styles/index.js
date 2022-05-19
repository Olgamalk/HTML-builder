//чтение папки
let fs = require('fs');
fs.readdir('folder/sub_folder', (err, files) => {
   if(err) throw err;
   console.log('В папке находятся файлы:' + files);
});

//является ли объект файлом
let fs = require('fs');
fs.stat('file.txt', (err, status) => {
   if(err) throw err; // не удалось получить данные статуса

   if(status.isDerictory()){
      console.log('Это папка');
   }
   if(status.isFile()){
      console.log('Это простой файл');
   }
});