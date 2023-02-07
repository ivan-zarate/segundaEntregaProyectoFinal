const connectionFb=require("../../connections/connectionFirebase")
const db=connectionFb.firestore();
const productosFb= db.collection("productos");

module.exports= productosFb;