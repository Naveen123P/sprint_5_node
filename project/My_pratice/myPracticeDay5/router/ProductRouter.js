const express = require("express");
const ProductModel = require('../model/ProductModel');
const ProductRouter = express.Router();
const {createProductHandler, getProductByIdHandler, deleteProductByIdHandler} = require('../controller/ProductController')

const getAllProductsHandler = async function(req,res){
    try{
        // This are done on the level of Database
        // find all the data
        // sort
        // select
        const query = req.query
        const selectQuery = query.select;
        const sortQuery = query.sort;
        let queryResProm = ProductModel.find();

        if(selectQuery){
            let order = sortQuery.split(" ")[1];
            let sortParam = sortQuery.split(" ")[0];
            if(order=="inc"){
                queryResProm = queryResProm.sort(sortParam); 
            } else{
                queryResProm = queryResProm.sort(-sortParam);
            }
        }

        if(selectQuery){
            queryResProm = queryResProm.select(selectQuery);
        }

        let productDetails = await queryResProm;
        
        res.status(200).json({
            status:"success",
            message:productDetails
        })
    }catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
    }

    // sorting by price
    // Selecting by (name, product)
}

// http://localhost:4000/api/product?sort=price%20inc&select=name%20description%20price

ProductRouter.get("/", getAllProductsHandler);
ProductRouter.post("/", createProductHandler);
ProductRouter.get("/:elementId",getProductByIdHandler);
ProductRouter.delete("/:elementId",deleteProductByIdHandler);

module.exports = ProductRouter;