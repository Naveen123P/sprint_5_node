const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config()
const UserModel = require("./UserModel")
const ProductModel = require("./ProductModel")
const {
    getAllFactory,
    createFactory,
    getByIdFactory,
    deleteByIdFactory
} = require("./utility/crudFactory")
const app = express()

const {PORT, DB_PASSWORD, DB_USER} = process.env;
const encodedPassword = encodeURIComponent(DB_PASSWORD);
const dbURL = `mongodb+srv://${DB_USER}:${encodedPassword}@cluster0.s8uvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURL).then(function(connection){
    console.log("connection success")
})

app.use(express.json());// to get data from user, is an example for userDefineMiddleware

/* User Controller Functions    */
/****** Users ******/
const createUserHandler = createFactory(UserModel);
const getAllUsers = getAllFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const deleteUserById = deleteByIdFactory(UserModel);

/****** Products *****/
const createProductHandler = createFactory(ProductModel);
const getAllProductsHandler = getAllFactory(ProductModel);
const getProductByIdHandler = getByIdFactory(ProductModel);
const deleteProductByIdHandler = deleteByIdFactory(ProductModel);

const checkInput = function(req,res,next){// checklist if we are sending the empty data or not to post method
    if(req.method == "POST"){
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"user Details are empty"
            })
        }else{
            next()
        }
    }else{
        next();
    }
}


/***** Routs  ******/
/**** User *****/
app.get("/api/user", getAllUsers);
app.post("/api/user",checkInput,createUserHandler);
app.get("/api/user/:userId",getUserById);
app.delete("api/user/:userId",deleteUserById);

/***** Products ******/
app.get("/api/product", getAllProductsHandler);
app.post("/api/product", createProductHandler);
app.get("/api/product/:productId",getProductByIdHandler);
app.delete("/api/product/:productId",deleteProductByIdHandler);



// 404 route not found
app.use(function(req,res){
    console.log("Use called")
    res.status(404).json({
        status:"failure",
        message:"404 Page Not Found"
    })
});

app.listen(PORT, function(req, res){
    console.log(`Server is running at port ${PORT}`);
})