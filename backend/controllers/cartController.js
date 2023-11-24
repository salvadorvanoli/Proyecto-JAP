// Importamos el model

const cartModel = require("../models/cartModel");
  
const getPurchasesByUser = async (req, res) => {
    const cart = await cartModel.getPurchasesByUser(req.params.username);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }
};

const getPurchaseDetails = async (req, res) => {
    const cart = await cartModel.getPurchaseDetails(req.params.compraid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }
};

const getjson = async (req, res) => {
    const user_cart = require("../data/user_cart/" + req.params.filename);
    if(user_cart){
        res.json(user_cart);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }

};

const success = async (req, res) => {
    const buy = require("../data/cart/buy.json");
    if (buy) {
        res.json(buy);
    } else {
        res.status(404).json({ message: "JSON no encontrado" });
    }
};

const addPurchase = async (req, res) => {
    const createdItem = await cartModel.addPurchase(req.body.username, req.body.fullname, req.body.sendtype, req.body.cardnum, req.body.cardname, req.body.carddate, req.body.cardcode, req.body.transfernumb, req.body.transfername, req.body.street, req.body.streetnumber, req.body.placereferences);
    if (createdItem) {
        res.json(createdItem);
    } else {
        res.status(500).json({ message: "Se rompió el servidor" });
    }
};

const addPurchaseDetails = async (req, res) => {
    const createdItem = await cartModel.addPurchaseDetails(req.params.compraid, req.body.productid, req.body.count, req.body.price, req.body.currency);
    if (createdItem) {
        res.json(createdItem);
    } else {
        res.status(500).json({ message: "Se rompió el servidor" });
    }
};

const getLastPurchase = async (req, res) => {
    const lastPurchase = await cartModel.getLastPurchase(req.params.username);
    if (lastPurchase) {
        res.json(lastPurchase);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }
};

module.exports = {
    getPurchasesByUser,
    getPurchaseDetails,
    addPurchase,
    addPurchaseDetails,
    getLastPurchase,
    success,
    getjson,
}