
// const http = require('http');
// const fs = require('fs')
// const port = 8000
// // const path = require('path')

// const requestHandler = (req,res)=>{
//     let filename = ''
// console.log(req.url);
//     switch(req.url){
//         case '/':
//             filename='views/Home.html'
//             break;
//         case '/about':
//             filename='views/About.html'
//             break;
//         case '/contact':
//             filename = 'views/Contact.html'
//             break;
//         default:
//             filename='views/404.html'
//     }

//     fs.readFile(filename, 'utf8', (err,data)=>{
//         if(err){
//             console.log("Error : ",err)
//             return;
//         }
//         res.end(data)
//     } )
// }

// const server = http.createServer(requestHandler);

// server.listen(port, (err)=>{
//     if(err){
//         console.log("Error : ",err);
//         return false;
//     }
//     console.log("Server start on port : ",port)
// })




const http = require('http');
const fs = require('fs')
const port = 8000
const path = require('path')

const requestHandler = (req,res)=>{
    let filename = ''
console.log(req.url);
    switch(req.url){
        case '/':
            filename='Home.html'
            break;
        case '/about':
            filename='About.html'
            break;
        case '/contact':
            filename = 'Contact.html'
            break;
        default:
            filename='404.html'
    }

    fs.readFile(path.join(__dirname,'views',filename),'utf8' ,(err,data)=>{
        if(err){
            console.log("Error : ",err)
            return;
        }
        res.end(data)
    } )
}

const server = http.createServer(requestHandler);

server.listen(port, (err)=>{
    if(err){
        console.log("Error : ",err);
        return false;
    }
    console.log("Server start on port : ",port)
})