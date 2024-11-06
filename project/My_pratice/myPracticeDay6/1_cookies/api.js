const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const {PORT} = process.env

// home
// product 
// cookies

// get the the home request i will add the cookies -> share that response with cookies
app.use(cookieParser())
app.get("/", function(req, res){
    res.cookie("prevPage", "home", {maxAge: 10000000000000, httpOnly: true})
    res.status(200).json({
        status:"success",
        message:"Cookies were successfully added",
    })
})

// we will check wether the user new to site or not
app.get("/products",function(req,res){
    console.log(req.cookies);
    let msgStr = "";
    if(req.cookies.prevPage){
        msgStr = `You have already visited the ${req.cookies.prevPage}` 
    }
    res.status(200).json({
        status:"success",
        message:`Thank you for accessing the product route ${msgStr}`
    })
})

// we will clear the cookies
app.get("/clearCookies",function(req,res){
    res.clearCookie("prevPage",{path:"/"});
    res.status(200).json({
        status:"success",
        message:"I have cleared your cookies"
    })
})

app.listen(PORT, function(req,res){
    console.log(`Server is running on port ${PORT}`);
});