//require internet (hyper text transfer protocol)
const http = require('http');
//require fs (file support)
const fs = require('fs')
//define server to run on internet
//req: The requested URL object
//res: The response object sent to the user
const server = http.createServer((req,res) => {
    console.log(req.url,req.method);

    //set header content type
    res.setHeader('Content-Type','text/html');

    //Define site map
    //200 indicates all is well (user has reached a page that exists)
    //301 indicates the resource attempting to be accessed has been moved (no longer in previous location)
    //404 indicates all is not well (user has attempted to reach a page that doesn't exist)
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            //redirect if path is /about-me to /about
            res.setHeader('Location','/about')
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    
    //send an html file
    fs.readFile(path, (err,data) => {
        if (err){
            console.log(err);
            res.end()
        }else{
            //res.write(data) (Not necessary to user write to send data if you're only sending one piece of data)
            res.end(data);
        }
    });
});
//Configure which port and type is listening for requests (Start Up The Server)
//arg1: port number
//arg2: host type
server.listen(3000,'localhost' , () =>{
    console.log('listening for requests on port 3000')
});
//Entering CTRL + C exits the server after it is run


