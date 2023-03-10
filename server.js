const express = require("express");
const cors = require('cors');
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const normalizedMessages= require("./src/normalizeMessages/normalizeMessages")
const connection = require('./src/connections/connectionmongodb');



const productMySql = require("./src/routes/productsRoutes/productsMySql");
const productsInFb = require("./src/routes/productsRoutes/productsFirebase");
const cartsInFb = require("./src/routes/cartsRoutes/cartsFirebase");
const productsInMongo = require("./src/routes/productsRoutes/productsMongo");
const cartsInMongo=require("./src/routes/cartsRoutes/cartsMongo");
const chatInMongo=require("./src/routes/messagesRoutes/messagesMongo")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//app en MariaDB

//app.use('/api', productMySql);

//app en MongoDB

app.use('/api', productsInMongo);
app.use('/api', cartsInMongo);
app.use('/api', chatInMongo);

//app en Firebase
// app.use('/api', productsInFb);
// app.use('/api', cartsInFb);

app.use(express.static("public"));

const mensajes = [];

io.on('connection', socket => {
  console.log('Nuevo cliente conectado!');
  socket.emit('mensajes', mensajes);
  socket.on('mensaje', data => {
    mensajes.push({ socketid: socket.id, mensaje: data })
    io.sockets.emit('mensajes', mensajes);
  });
});

connection().then(()=> console.log('Connected to Mongo')).catch(()=> console.log('An error occurred trying to connect to mongo'));

const srv = server.listen(port, () => {
  console.log(`Escuchando app en el puerto ${srv.address().port}`);
});

srv.on('error', error => console.log(`Error en servidor ${error}`))

module.exports=mensajes