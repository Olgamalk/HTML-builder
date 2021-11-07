const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'));

stream.on('readable', function () {
  let data = stream.read();
  stdout.write(data);
  process.exit();
});