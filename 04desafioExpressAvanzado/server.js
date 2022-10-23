// esto no se usa, es viejo
// const http = require('http');
const express = require('express');
const productRouter = require("./routes/products");
// creo servidor con express
const app = express();

// agregar para que funcione el send de postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ruta o endpoint siempre el código entre app y app.listen
// endpoints
app.get("/", (req, res) => {
    res.send("hello Express server");
});


// inicia el servidor
app.listen(8080, ()=> {
    console.log("servidor iniciado");
})

app.use("/api/products", productRouter);


