const express = require("express");
const app = express();
const path = require("path");
const router = require('./router.js')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(express.static(path.join(__dirname,'views')));//our views and stylesheets

app.use(router);//all routes

app.listen(5000,() => console.log("ready"));//here we hear the port



