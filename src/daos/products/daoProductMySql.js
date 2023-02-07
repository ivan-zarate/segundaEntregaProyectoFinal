const options= require('../../connections/connectionmem');
const knex= require('knex')(options);

const productsMySql =[
    {timeStamp: "Jan 11, 2023 10:06 PM", name: "Lámpara de Luna",description:"Lámpara De Luna (moonlamp) 20 Cm Ideal Ambientación", code:147779, url:"https://http2.mlstatic.com/D_NQ_NP_765507-MLA50046663273_052022-O.webp", price:1000, stock:198},
    {timeStamp: "Jan 17, 2023 2:06 PM", name: "Chikorita",description:"Modelo inspirado en el Pokemon Chikorita", code:7888812, url:"https://files.cults3d.com/uploaders/17591601/illustration-file/18e87cac-46dd-4b13-b6c1-15887bcf8e0c/2.png", price:2200, stock:200},
    {timeStamp: "Jan 17, 2023 2:08 PM", name: "Bomba Agua",description:"Bomba Agua Periferica Gamma 2763 Qb 60 Qb60 1/2 Hp Turbina Bronce Eleva 20mts 40lts/min Garantia 2 Años + Regalo", code:55646457, url:"https://http2.mlstatic.com/D_NQ_NP_784028-MLA44639719803_012021-O.webp", price:22000, stock:68},
]

knex("products").insert(productsMySql)
.then(()=>console.log("data inserted"))
.catch((err)=>{console.log(err);throw err})
.finally(()=>{
    console.log("closed connection");
    knex.destroy();
})

module.exports = productsMySql