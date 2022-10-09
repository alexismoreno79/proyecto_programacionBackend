// esto no se usa, es viejo
// const http = require('http');

const productos = require('./productos.js');

const express = require('express');

// creo servidor con express
const app = express();

// ruta o endpoint siempre el código entre app y app.listen
//endpoints
app.get("/", (req, res) => {
    res.send("hello Express server");
});
// petición .get
// req representa el resquest (petición) y res representa el response (respuesta)
app.get("/productos", (req, res)=>{
    // para responder información .json
    // siempre se usa ésto
    res.json(productos);
    // para responder en html .send
    // ejemplo con html
    // res.send("<h1>Bienvenido</h1>")
})

app.get("/productoRandon", (req, res)=>{
    const num = productos.map((producto)=>producto.id);
    const random = productos[Math.floor(Math.random() * num.length)];
    res.send(random);
})

// inicia el servidor
// por lo general el puerto que se utilizan en los rengo de 3000, 5000, 8000
// hasta la primer centena
app.listen(8080, ()=> {
    console.log("servidor iniciado");
})


// app.get("/productoRandom", async (req, res) => {
//     const data = await new Contenedor("./desafio3/products.json").getAll();
//     const random = data[Math.floor(Math.random() * data.length)];
//     res.send(random);
// });

