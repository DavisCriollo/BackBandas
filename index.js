const express = require('express');
const path = require('path');
require('dotenv').config();

// ===== App de express  ======//
const app = express();

// ====== CREO EL SERVIDOR DE NODE =====//
const server = require('http').createServer(app);
// configuro la extencion para poderlo utizar en el otro archivo
module.exports.io = require('socket.io')(server);
//AGREGO EL ARCHIVO DE LOS SOCKETS
require('./sockets/sockets');

// ====================================//





// ===== PATH PUBLICO  ======//
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
// ==========================//

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});