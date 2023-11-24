const express = require("express");
const cartRouter = express.Router();

// Importamos los controllers necesarios

const cartController = require("../controllers/cartController");

cartRouter.get("/:username", cartController.getPurchasesByUser);

cartRouter.get("/products/:username", cartController.getPurchaseDetails);

cartRouter.get("/lastpurchase/:username", cartController.getLastPurchase);

cartRouter.post("/addpurchase", cartController.addPurchase);

cartRouter.post("/adddetails/:compraid", cartController.addPurchaseDetails);

module.exports = cartRouter;
