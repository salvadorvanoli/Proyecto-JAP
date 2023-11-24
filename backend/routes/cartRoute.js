const express = require("express");
const cartRouter = express.Router();

// Importamos los controllers necesarios

const cartController = require("../controllers/cartController");

cartRouter.get("/", cartController.getCarts);

cartRouter.get("/:username", cartController.getCartByUser);

cartRouter.post("/:username/:productid", cartController.addItem);

cartRouter.delete("/:username/:productid", cartController.deleteItem);

module.exports = cartRouter;
