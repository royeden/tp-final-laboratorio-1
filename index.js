const handlePatch = require('./handlePatch');
const qr = require('./qr');
const server = require('./server');

handlePatch(['tp_final.pde']);
qr();
server();
