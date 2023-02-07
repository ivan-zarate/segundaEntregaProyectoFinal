const options= require('../../connections/connectionmem');
const knex= require('knex')(options);

const productOnMySql= knex.schema.createTable("products", table=>{
    table.increments("id");
    table.string("timeStamp");
    table.string("name");
    table.string("description");
    table.integer("code");
    table.string("url");
    table.integer("price");
    table.integer("stock");
})
.then (()=>console.log("table created"))
.catch((err)=>{console.log(err);throw err})
.finally(()=>{
    console.log("closed connection");
    knex.destroy();
})

module.exports=productOnMySql