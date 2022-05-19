const fs = require('fs');
const path = require('path');
// const process = require('process');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

console.log(`Please enter text to the text.txt file. If you want to end, enter 'exit' or add Ctrl+C`);

process.on('exit', () => {
    console.log(`\nFile was created and your text was added.`);
});

rl.on('line', (line) => {
    if (line.toLowerCase() == 'exit') {
        rl.close();
    } else {
        file.write(line + '\n');
    }
})