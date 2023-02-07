const express = require("express");
const cartInFb = express.Router();
const cartsFb = require("../../schemas/cart/schemaCartFirebase");
const productosFb = require("../../schemas/product/schemaProductFirebase");
const validateBody = require("../../middlewares/validateBody");

cartInFb.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

cartInFb.get("/cart/products", async (req, res) => {
    try {
        const productInCart = await cartsFb.get();
        const carts = productInCart.docs;
        const allProductsInCart = carts.map((cart) => ({
            id: cart.id,
            ...cart.data()
        }))
        return res.status(200).send(allProductsInCart);
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

cartInFb.post("/cart/products/:id", validateBody, async (req, res) => {
    try {
        const productInCart = await cartsFb.get();
        const carts = productInCart.docs;
        const allProductsInCart = carts.map((cart) => ({
            id: cart.id,
            ...cart.data()
        }))
        const producToFind = await productosFb.doc(req.params.id).get();
        if (!producToFind) {
            return res.status(400).send("Producto no encontrado");
        }
        const newCart={
            id:req.params.id,
            items:req.body
        }
        
        allProductsInCart.push(newCart);
        await cartsFb.add(newCart);
        return res.status(200).send("Producto agregado");

    }
     catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

cartInFb.delete("/cart/products/:id", async (req, res) => {
    try {
        await cartsFb.doc(req.params.id).delete();
        return res.status(200).send("Producto eliminado correctamente");
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});


module.exports = cartInFb;