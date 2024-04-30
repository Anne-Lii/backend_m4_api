/*Routes for authentication and login */

const express = require("express");
const router = express.Router();

//Add new user
router.post("/register", async (req, res) => {
   try {
    const {username, password, email} = req.body;

    //validate input
    if (!username || !password || !email) {
        return res.status(400).json({ error: " invalid input, send username, password and email"});
    }

    //correct - save user
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
        if (username === "annelii" && password === "password") {
            res.status(200).json({ message: " Login succesful..."});
        } else {
           res.status(401).json({ error: "Invalid username/password"});
        }
    
       } catch (error) {
        res.status(500).json({error: " server error"});
       }
});

//return
module.exports = router;