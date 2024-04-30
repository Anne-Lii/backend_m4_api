/*Routes for authentication and login */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//connect to MongoDB database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB...");
}).catch((error) => {
console.error("Error connecting to database");
});

//User interface
const User = require("../models/user");


//Add new user
router.post("/register", async (req, res) => {
   try {
    const {username, password, email} = req.body;

    //validate input
    if (!username || !password || !email) {
        return res.status(400).json({ error: " invalid input, send username, password and email"});
    }

    //correct - save user
    const user = new User({ username, password, email});
    await user.save();
    res.status(201).json({ message: " User created"});

   } catch (error) {
    res.status(500).json({error: " server error"});
   }
});

//Login user
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;
    
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: " invalid input, send username and password"});
        }
    
        //check credentials

        //Does user exist?
        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({ error: "Incorrect username/password"});
        }

        //check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Incorrect username/password"});
        } else {
            res.status(200).json({mesage: "User logged in"});
        }
    
    
       } catch (error) {
        res.status(500).json({error: " server error"});
       }
});

//return
module.exports = router;