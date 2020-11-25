// AGREGO EL ARCHIVO DESDE 
const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');



const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Metálica'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Nirvana'));
bands.addBand(new Band('Enanitos Verdes'));

console.log(bands);




// =====MENSAJES DE SOCKETS ==============//
io.on('connection', client => {

    console.log('Cliente Conectado...!');


    client.emit('active-bands', bands.geBands());


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // =======  EMITE Y ESCUCHA MENAJES EL SERVIDOR ============//

    // ESCUCHA EL MENSAJE
    client.on('mensaje', (payload) => {
        console.log('Mensaje !!!', payload);
        // EMITIR MENSAJE A TODOS LOS CLIENTES CONECTADOS  
        io.emit('mensaje', { admin: "Nuevo mensaje del servidor" })
    });
    // =========================================================//
    // ESCUCHA EL MENSAJE PERSONALIZADO
    client.on('nuevo-mensaje', (payload) => {
        // EMITIR MENSAJE A TODOS LOS CLIENTES CONECTADOS  
        // io.emit('nuevo-mensaje', { admin: payload }) // EMITE A TODOS LOS CLIENTES
        client.broadcast.emit('nuevo-mensaje', payload) //EMITE A TODOS LOS CLIENTES MENOS CLIENTE Q EMITE
    });
    // =========================================================

    // ESCUCHA EL MENSAJE TAREA
    client.on('emitir-mensaje', (payload) => {
        // console.log(payload);
        // EMITIR MENSAJE A TODOS LOS CLIENTES CONECTADOS  
        client.broadcast.emit('emitir-mensaje', payload) //EMITE A TODOS LOS CLIENTES MENOS CLIENTE Q EMITE
    });
    // =========================================================

    // ESCUCHA EL MENSAJE dDE BANDA VOTADA
    client.on('puntaje-banda', (payload) => {
        // console.log(payload);
        bands.voteBand(payload.id);
        // EMITIR MENSAJE A TODOS LOS CLIENTES CONECTADOS  
        io.emit('active-bands', bands.geBands());
        //  client.broadcast.emit('puntaje-vanda', payload) //EMITE A TODOS LOS CLIENTES MENOS CLIENTE Q EMITE
    });
    // =========================================================
    // ESCUCHA EL MENSAJE DE AGREGA BANDA
    client.on('add-band', (payload) => {
        // console.log(payload);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        // EMITIR MENSAJE A TODOS LOS CLIENTES CONECTADOS  
        io.emit('active-bands', bands.geBands());
        //  client.broadcast.emit('puntaje-vanda', payload) //EMITE A TODOS LOS CLIENTES MENOS CLIENTE Q EMITE
    });
    // =========================================================
    // ESCUCHA EL MENSAJE DE ELIMINAR BANDA
    client.on('delete-banda', (payload) => {
        // console.log(payload);
        bands.deleteBand(payload.id);
        // EMITIR MENSAJE A TODOS LOS CLIENTES CONECTADOS  
        io.emit('active-bands', bands.geBands());
        //  client.broadcast.emit('puntaje-vanda', payload) //EMITE A TODOS LOS CLIENTES MENOS CLIENTE Q EMITE
    });
    // =========================================================



});
// ============================================//