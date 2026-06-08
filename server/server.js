const express=require('express')
let mongoose = require("mongoose");
let dotenv = require("dotenv");
let cors = require("cors");
const app=express()
let port=5000
app.get('/', function(req,res){
    res.send('Auth api is running')
})

app.listen(5000, ()=>{console.log(`sever start on port ${port}`)})
