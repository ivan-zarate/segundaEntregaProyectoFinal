const express = require("express");
const productsInFb = express.Router();
const productosFb = require("../../schemas/product/schemaProductFirebase")
const validateBody = require("../../middlewares/validateBody");
const validateUser = require("../../middlewares/validateUser");

productsInFb.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

productsInFb.get("/products", async (req, res) => {
    try {
        const readProducts = await productosFb.get();
        const products = readProducts.docs;
        const response = products.map((product) => ({
            id: product.id,
            ...product.data()
        }))
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

productsInFb.post("/products", validateBody, validateUser, async (req, res) => {
    try {
        const createProduct = await productosFb.add(req.body);
        return res.status(200).send("Producto cargado exitosamente", createProduct);
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

productsInFb.put("/products/:id", validateBody, validateUser, async (req, res) => {
    try {
        await productosFb.doc(req.params.id).update(req.body);
        return res.status(200).send("Producto actualizado correctamente");
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});

productsInFb.delete("/products/:id", validateUser, async (req, res) => {
    try {
        await productosFb.doc(req.params.id).delete();
        return res.status(200).send("Producto eliminado correctamente");
    } catch (error) {
        return res.status(500).send({
            error: `An error occurred trying to read products ${error.message}`,
        });
    }
});


module.exports = productsInFb;