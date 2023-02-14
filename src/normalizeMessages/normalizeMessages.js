const mensajes = require("../../server");
const {normalize, denormalize, schema}= require("normalizr");
const util = require("util");

const authorSchema= new schema.Entity("author")
const mensajeSchema= new schema.Entity("mensajes", {
    id: mensaje,
    author:authorSchema
});

const print= (obj) =>console.log(util.inspect(obj, false, 12, true));

const normalizedMessages= normalize(mensajes, mensajeSchema)
print(normalizedMessages);

module.exports= normalizedMessages