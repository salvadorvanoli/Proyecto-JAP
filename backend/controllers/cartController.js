// Importamos el model

const cartModel = require("../models/cartModel");

const getCarts = async (req, res) => {
    const carts = await cartModel.getCarts();
    res.json(carts);
};
  
const getCartByUser = async (req, res) => {
    const cart = await cartModel.getCartByUser(req.params.username);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }
};

const addItem = async (req, res) => {
    const createdItem = await cartModel.addItem(req.params.username, req.params.productid);
    if (createdItem) {
        res.json(createdItem);
    } else {
        res.status(500).json({ message: "Se rompió el servidor" });
    }
};

const deleteItem = async (req, res) => {
    const cart = await cartModel.getCartByUser(req.params.username);
    if (cart) {
        const result = await cartModel.deleteItem(req.params.username, req.params.productid);

        if (result) {
        res.json(cart);
        } else {
        res.status(500).json({ message: "Se rompió el servidor" });
        }
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
};

module.exports = {
    getCarts,
    getCartByUser,
    deleteItem,
    addItem,
};