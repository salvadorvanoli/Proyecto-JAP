// LIBRERÍAS

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const SECRET_KEY = "EL MEJOR GRUPO";

// INSTANCIA EXPRESS

const app = express();

app.use(express.json());
app.use(cors());

// PUERTO DEL SERVIDOR

const port = 3000;

// ENDPOINT LOGIN

app.post("/login", (req, res) => {
    const { user, pass } = req.body;
    if (user != "" && pass != "") {
      const token = jwt.sign({ user }, SECRET_KEY);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
    }
});

// MIDDLEWARE PARA CADA ENDPOINT

app.use("/cart", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
});

app.use("/cats", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
});

app.use("/cats_products", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
});

// ENDPOINTS PARA CADA JSON

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