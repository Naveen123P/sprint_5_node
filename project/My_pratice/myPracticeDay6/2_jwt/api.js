const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cookieParser());

const promisify = require('util').promisify;

const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);

// send token
app.get('/sign', async function(req, res){
    try{
        const payload = { userId: "1234", role: "admin" };
        const secretKey = "mySecret";
        const authToken = await promisifiedJWTSign({ data: payload }, secretKey, { expiresIn: "1h", algorithm: "HS256" });
        res.cookie( "jwt", authToken, {maxAge: 1000000000, httpOnly: true }); 
        res.status(200).json({
            status:"success",
            message: "sign the jwt token and sending it in cookies",
            authToken
        })  
    }catch(err){
        res.status(500).json({
            status:"failure",
            message:err.message
        })
    }

})

app.get("/verify", async function(req, res){
    try{
        const decodedToken = await promisifiedJWTVerify(req.cookies.jwt, "mySecret");
        res.status(200).json({
            status:"success",
            message: "Token is decoded successfully",
            decodedToken
        })
    }catch(err){
        res.status(500).json({
            status:"failure",
            message:err.message
        })
    }
})

app.listen(4000, function(req, res){
    console.log('Server is listening on port 4000');
})