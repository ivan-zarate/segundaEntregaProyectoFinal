const express = require("express");
const productsInFb = express.Router();
const productosFb=require("../../schemas/product/schemaProductFirebase")
const validateBody = require("../../middlewares/validateBody");
const validateUser = require("../../middlewares/validateUser");

productsInFb.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

productsInFb.get("/products", async (req, res) => {
  try {
    const readProducts= await productosFb.get();
    const products=readProducts.docs;
    const response=products.map((product)=>({
        id:product.data()._id,
        name:product.data().name,
        code:product.data().code,
        description:product.data().description,
        url:product.data().url,
        price:product.data().price,
        stock:product.data().stock,
    }))
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({
      error: `An error occurred trying to read products ${error.message}`,
    });
  }
});

productsInFb.post("/products", validateBody,validateUser, async (req, res) => {
  try {
    const createProduct = await productosFb.add(req.body);
    return res.status(200).send(createProduct);
  } catch (error) {
    return res.status(400).send({
      error: `An error occurred trying to read products ${error.message}`,
    });
  }
});

productsInFb.put("/products/:id", validateBody,validateUser,  async (req, res) => {
    try {
       
        const readProducts= await productosFb.get();
        const products=readProducts.docs;
        const response=products.map((product)=>({
            id:product.data()._id,
        }))
        const prueba=response.find((product)=>product.id===req.params.id)
      if(prueba){
        const newProduct=products.map((product)=>({
            id:req.params.id,
            name:req.body.name,
            code:req.body.code,
            description:req.body.description,
            url:req.body.url,
            price:req.body.price,
            stock:req.body.stock,
        }))
        console.log(newProduct);
      }
    
      //result.update(req.body);
      return res.status(200).send(products);
    } catch (error) {
      return res.status(400).send({
        error: `An error occurred trying to read products ${error.message}`,
      });
    }
  });

  productsInFb.delete("/products/:id", validateUser, async (req, res) => {
    try {
      const result = await productosFb.doc();
      console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({
        error: `An error occurred trying to read products ${error.message}`,
      });
    }
  });
  

module.exports = productsInFb;