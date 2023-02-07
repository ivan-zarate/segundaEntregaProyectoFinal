const express = require("express");
const options = require('../../connections/connectionmem');
const knex = require('knex')(options);
const validateBody = require("../../middlewares/validateBody");
const validateUser = require("../../middlewares/validateUser");
const moment = require("moment");
const productMySql = express.Router();


productMySql.use((req, res, next) => {
  console.log("Time: ", Date());
  next();
});

productMySql.get("/products", async (req, res) => {

  await knex
    .from("products")
    .select("*")
    .then((products) => {
      res.status(200).send({ product: products });
    })
    .catch((err) => { console.log("Nuevo error ", err); throw err })

});

productMySql.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  await knex
    .from("products")
    .select("id", "name", "description", "code", "url", "price", "stock").where("id", "=", id)
    .then((product) => {
      if (product.length === 0) {
        res.status(400).send({ error: 'producto no encontrado' });
      }
      else {
        res.status(200).send({ product: product });
      }
    })
    .catch((err) => { console.log(err); throw err })
});

productMySql.post("/products", express.json(), validateBody, validateUser, async (req, res) => {
  try {
    const { name, price, url, description, code, stock } = req.body;
    const time = moment().format('lll');
    await knex("products").insert({ timeStamp: time, name: name, description: description, code: code, url: url, price: price, stock: stock });
    res.status(200).send("Producto cargado con exito");
  }
  catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

productMySql.put("/products/:id", validateBody, validateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, url, description, code, stock } = req.body;
    const time = moment().format('lll');
    await knex.from("products").where("id", "=", id).update({ timeStamp: time, name: name, description: description, code: code, url: url, price: price, stock: stock });
    res.status(200).send("Producto actualizado con exito");
  }
  catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

productMySql.delete("/products/:id", validateUser, async (req, res) => {
  try {
    const { id } = req.params;
    await knex.from("products").where("id", "=", id).del();
    res.status(200).send("Producto eliminado con exito");
  }
  catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = productMySql;