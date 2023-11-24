// LIBRERÍAS

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const SECRET_KEY = "EL MEJOR GRUPO";

// Importamos el router del carrito

const cartRouter = require("./routes/cartRoute");

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

//MIDDLEWARE PARA EL CART

app.use("/cart", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
});

// ENDPOINTS PARA CADA JSON

app.get('/cats', (req, res) => {
    const cats = require("./data/cats/cat.json")
    res.json(cats);
});

app.get('/cats/products/:filename', (req, res) => {
    const filename = req.params.filename;
    const cat_product = require("./data/cats_products/" + filename)
    res.json(cat_product);
});

app.get('/products/:filename', (req, res) => {
    const filename = req.params.filename;
    const product = require("./data/products/" + filename)
    res.json(product);
});

app.get('/products/comments/:filename', (req, res) => {
    const filename = req.params.filename;
    const product_comment = require("./data/products_comments/" + filename)
    res.json(product_comment);
});

app.get('/sell', (req, res) => {
    const sell = require("./data/sell/publish.json")
    res.json(sell);
});

// Asociamos los routers con las rutas

app.use("/cart", cartRouter);

// Mensaje de port satisfactorio

app.listen(port,()=>{
    console.log("todo funcionando bien....");
});