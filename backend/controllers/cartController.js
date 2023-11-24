// Importamos el model

const cartModel = require("../models/cartModel");

// const getCarts = async (req, res) => {
//     const carts = await cartModel.getCarts();
//     res.json(carts);
// };
  
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

const addPurchase = async (req, res) => {
    const createdItem = await cartModel.addPurchase(req.body.username, req.body.envio, req.body.cardnum, req.body.cardname, req.body.carddate, req.body.cardcode, req.body.transfernumb, req.body.transfername);
    if (createdItem) {
        res.json(createdItem);
    } else {
        res.status(500).json({ message: "Se rompió el servidor" });
    }
};

const addPurchaseDetails = async (req, res) => {
    const createdItem = await cartModel.addPurchaseDetails(req.body.compraid, req.body.productid, req.body.count, req.body.price, req.body.currency);
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

// const addItem = async (req, res) => {
//     const createdItem = await cartModel.addItem(req.params.username, req.params.productid);
//     if (createdItem) {
//         res.json(createdItem);
//     } else {
//         res.status(500).json({ message: "Se rompió el servidor" });
//     }
// };

// const deleteItem = async (req, res) => {
//     const cart = await cartModel.getCartByUser(req.params.username);
//     if (cart) {
//         const result = await cartModel.deleteItem(req.params.username, req.params.productid);

//         if (result) {
//         res.json(cart);
//         } else {
//         res.status(500).json({ message: "Se rompió el servidor" });
//         }
//     } else {
//         res.status(404).json({ message: "Usuario no encontrado" });
//     }
// };

module.exports = {
    getPurchasesByUser,
    getPurchaseDetails,
    addPurchase,
    addPurchaseDetails,
    getLastPurchase,
}