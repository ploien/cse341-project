const http = require('http'); 

const prove01Routes = require('./prove01Routes');

const server = http.createServer(prove01Routes);

server.listen(5000);

