const fs = require('fs');

async function readFile() {
 fs.readFileSync('./data/myFile.txt', 'utf8', (err, data) => {
    console.log(__dirname);
    if (err) {
        console.error(err);
        return;
    }
   console.log(data);
});
}

async function writeFile() {

   const content = 'This is the content to be written to the file.';

fs.writeFileSync('./data/myFile.txt', content, 'utf8', (error) => {
    if (error) {
        console.error('An error occurred while writing to the file:', error);
        return;
    }
    console.log('File has been written successfully.');
});
}

module.exports = { writeFile} ;

