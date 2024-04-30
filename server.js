/*Anne-Lii Hansen*/
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

//start applikation
app.listen(port,()=> {
    console.log("server running at port: " + port)
})