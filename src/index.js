/*Modules*/
const express = require("express");
const app = express();
const path = require("path");
const router = require('./router.js')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/*our files*/
app.use(express.static(path.join(__dirname,'views')));//our views and stylesheets
app.use(router);//all routes
/*port*/
app.listen(5000,() => console.log("ready on port 5000"));//here we hear the port
