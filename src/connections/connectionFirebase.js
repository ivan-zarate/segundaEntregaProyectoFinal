
const admin = require("firebase-admin");

const serviceAccount = require("../../backendecommerce-75dc3-firebase-adminsdk-i811s-06bf5c7498.json");
// const connectionFirebase = async () => {
//     try {
const connectionFb= admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backendecommerce-75dc3.firebaseio.com'
});
console.log("Conectado a Firebase");

//     } catch (error) {
//         console.log("Error", error);
//     }
// }

module.exports= connectionFb

