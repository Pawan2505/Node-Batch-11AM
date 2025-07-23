
// const fs = require('fs');

// fs.readFile('input.txt', 'utf8', (err, data) => {

//     if(err){
//         console.error('Error reading file:', err);
//         return false;
//     }
//     console.log('File contents:', data);
  
// })


// const fspromises = require('fs').promises;

// async function readFile() {
//     try {
//         const data = await fspromises.readFile('input.txt', 'utf8');
//         console.log('File contents:', data);
//     } catch (err) {
//         console.error('Error reading file:');
//     }
// }


// readFile();


const http = require('http');

const port = 8000;

const server = http.createServer((req, res) => {
    res.write('Hello, World!');
    res.end();
});

server.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return false;
    }
    console.log(`Server is running on http://localhost:${port}`);
});

