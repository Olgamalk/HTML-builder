let fs = require('fs');
let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let writeableStream = fs.createWriteStream("some.txt");
writeableStream.write('Hello world!');
writeableStream.end('End!');

rl.question('What do you add in the file?', function(answer) {
    console.log('Thanks for your answer:', answer);

    rl.close();
})