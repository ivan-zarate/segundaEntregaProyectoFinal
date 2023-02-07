
const admin = require("firebase-admin");

const serviceAccount = require("../../backendecommerce-75dc3-firebase-adminsdk-i811s-06bf5c7498.json");

const connectionFb= admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backendecommerce-75dc3.firebaseio.com'
});
if(!connectionFb){
    return ("Se produjo un error al intentar conectarse a Firebase")
}
console.log("Conectado a Firebase");


module.exports= connectionFb

