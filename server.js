/*Anne-Lii Hansen*/

//include packages and routes
const express = require("express");
const bodyParser = require("body-parser");
const authlogRoutes = require("./routes/authlogRoutes");//include route for auth and login
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

//Routes
app.use("/api", authlogRoutes); 

//start applikation
app.listen(port,()=> {
    console.log("server running at port: " + port)
})