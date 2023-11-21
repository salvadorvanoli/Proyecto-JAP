//llamamos a express
const express = require("express");

const cors = require("cors");

//creamos una instancia de express
const app = express();

app.use(cors());

//usamos un puerto para el servidor
const port = 3000;

//endpoints de cada json

app.get('/cart', (req, res) => {
    const cart = require("./data/cart/buy.json")
    res.json(cart);
});

app.get('/cats', (req, res) => {
    const cats = require("./data/cats/cat.json")
    res.json(cats);
});

app.get('/cats_products/:filename', (req, res) => {
    const filename = req.params.filename;
    const cat_product = require("./data/cats_products/" + filename)
    res.json(cat_product);
});

app.get('/products/:filename', (req, res) => {
    const filename = req.params.filename;
    const product = require("./data/products/" + filename)
    res.json(product);
});

app.get('/products_comments/:filename', (req, res) => {
    const filename = req.params.filename;
    const product_comment = require("./data/products_comments/" + filename)
    res.json(product_comment);
});

app.get('/sell', (req, res) => {
    const sell = require("./data/sell/publish.json")
    res.json(sell);
});

app.get('/user_cart', (req, res) => {
    const user_cart = require("./data/user_cart/25801.json")
    res.json(user_cart);
});

app.listen(port,()=>{
    console.log("todo funcionando bien....");
});