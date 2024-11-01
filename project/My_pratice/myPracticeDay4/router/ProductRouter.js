const express = require("express");
const ProductRouter = express.Router();
const {createProductHandler, getAllProductsHandler, getProductByIdHandler, deleteProductByIdHandler} = require('../controller/ProductController')

ProductRouter.get("/", getAllProductsHandler);
ProductRouter.post("/", createProductHandler);
ProductRouter.get("/:productId",getProductByIdHandler);
ProductRouter.delete("/:productId",deleteProductByIdHandler);

module.exports = ProductRouter;