const connectionFb=require("../../connections/connectionFirebase")
const db=connectionFb.firestore();
const cartsFb= db.collection("carts");

module.exports= cartsFb;