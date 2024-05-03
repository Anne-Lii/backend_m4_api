/*Anne-Lii Hansen*/

//include packages and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authlogRoutes = require("./routes/authlogRoutes");//include route for auth and login
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "*"}));

//Routes
app.use("/api", authlogRoutes); 

//protected route
app.get("/api/mypages", authenticateToken, (req, res) => {
    res.json({message: "authentication and token validation succesful", user: req.user});
});

//validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //token

    if(token == null) res.status(401).json({message: "Not authorized for this route - Token missing!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if(error) return res.status(403).json({message: "Unvalid JWT!"});

        req.user = user;
        next();
    });
}

//start applikation
app.listen(port,()=> {
    console.log("server running at port: " + port)
})