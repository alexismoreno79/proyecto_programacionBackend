// Dentro de products.js
// 1:
const express = require("express");
const { request, response } = require('express');
const productos = require('../productos.js');
// 2: crear un objeto donde vamos a enlazar las rutas
// Vamos a utilizar el módulo express y vamos a accedere a la clase Router
// De ésta forma creamos un objeto donde se van a estar enazando diferentes rutas
const productRouter = express.Router(); // de ésta forma se ejecuta

productRouter.get("/", (req, res)=>{
    // para responder información .json
    // siempre se usa ésto
    res.json(productos);
    // para responder en html .send
    // ejemplo con html
    // res.send("<h1>Bienvenido</h1>")
})

productRouter.get("/productoRandon", (req, res)=>{
    const num = productos.map((producto)=>producto.id);
    const random = productos[Math.floor(Math.random() * num.length)];
    res.send(random);
})

productRouter.get("/", (request, response)=>{ 
    if (Object.keys(request.query).length>0) {
        // console.log("request", request.query)
        const {name} = request.query;
        const newProducs = productos.filter(elm=>elm.name === name);
        response.send(newProducs);
    } else {
        response.send(productos);
    }
})

// http://localhost:8080/fruits/2
// ruta url params o parámetros de identificación
// router.get("/fruits/:fruitId", (request, response)=>{ // debo sacar el fruits dentro de la ruta
productRouter.get("/:productId", (request, response)=>{
    const {productId} = request.params;
    const product = productos.find(elm=>elm.id === parseInt(productId));
    response.send(product);
})

// petición de tipo post, para guardar elemento
// router.post("/fruits", (request, response)=>{ // debo sacar el fruits dentro de la ruta
productRouter.post("/", (request, response)=>{
    const newProduct = request.body;
    productos.push(newProduct);
    response.send(productos);
})

// actualización tipo put
// router.put("/fruits/:id", (request, response)=>{ // debo sacar el fruits dentro de la ruta
productRouter.put("/:id", (request, response)=>{
    const {id} = request.params;
    const modification = request.body;
    const productPos = productos.findIndex(elm=>elm.id === parseInt(id));
    if (productPos>=0) {
        // modificamos el elemento
        productos[productPos] = modification;
        response.status(200).send(productos);
    } else {
        response.status(404).send("el elemento no se encontró");
    }
    console.log(id, modification);
    response.send("peticion");
})

productRouter.delete("/:id", (request, response)=>{
    // const {id} = request.params;
    try {
        const id = JSON.parse(request.params.id);
        new productos.deleteById(id);
        response.status(200).send("producto eliminado");
        response.send(productos);
    } catch (error) {
        return res.status(400);
    }
    // response.status(200).send("Producto eliminado");
    // response.send(productos);
})

// lo único que se exporta es el objeto router, dónde estamos asociando las rutas
module.exports = productRouter;