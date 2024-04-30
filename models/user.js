const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user interface
const userInterface = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//hash password
userInterface.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

//register user
userInterface.statics.register = async function (username, password, email) {
    try {
        const user = new this({username, password, email});
        await user.save();
        return user;
    } catch(error) {
        throw error;
    }
};

//compare hashed password
userInterface.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);   
    } catch (error) {
        throw error;
    }
}

//Login user
userInterface.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({username});
        if(!user) {
            throw new Error("Incorrect username/password.");
        }

        const isPasswordMatch = await user.comparePassword(password);

        //incorrect
        if(!isPasswordMatch) {
            throw new Error("Incorrect username/password.");
        }

        //Correct
        return user;

    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", userInterface);
module.exports = User;