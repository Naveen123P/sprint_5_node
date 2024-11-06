const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config()
const UserRouter = require('./router/UserRouter')
const ProductRouter = require('./router/ProductRouter')
const app = express()

const {PORT, DB_PASSWORD, DB_USER} = process.env;
const encodedPassword = encodeURIComponent(DB_PASSWORD);
const dbURL = `mongodb+srv://${DB_USER}:${encodedPassword}@cluster0.s8uvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURL).then(function(){
    console.log("connection success3")
})

app.use(express.json());// to get data from user, is an example for userDefineMiddleware

app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

// app.get("/search", function(req, res){
//     console.log(req.query);
//     res.status(200).json({
//         message:req.query,
//         status:"success",
//     })
// })

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