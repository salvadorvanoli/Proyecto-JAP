const express = require("express");
const cartRouter = express.Router();

// Importamos los controllers necesarios

const cartController = require("../controllers/cartController");

cartRouter.get("/success/", cartController.success);

cartRouter.get("/getjson/:filename", cartController.getjson);

cartRouter.get("/purchases/:username", cartController.getPurchasesByUser);

cartRouter.get("/purchases/lastpurchase/:username", cartController.getLastPurchase);

cartRouter.post("/purchases/addpurchase/", cartController.addPurchase);

cartRouter.get("/details/:compraid", cartController.getPurchaseDetails);

cartRouter.post("/details/adddetails/:compraid", cartController.addPurchaseDetails);

module.exports = cartRouter;
