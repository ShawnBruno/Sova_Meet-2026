// const User = require('../models/User');

const express = require('express');
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bycrypt = require('bcryptjs');
const { generateToken, authenticate } = require('../middleware/requireLogin');

module.exports = (app) => {

    //register user
    app.post("/api/v1/register", async (req, res) => {
        const { name, email, password, profilePicture } = req.body;
        try {
            // Check if user already exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const salt = await bycrypt.genSalt(10);
            const hashedPassword = await bycrypt.hash(password, salt);

            // Create new user
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                profilePicture
            });

            if (user) {
                res.status(201).json({ 
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400).json({ message: "Invalid user data" });
            }

        }catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ message: "Error registering user: ", error });
        }
    });

    //login user
    app.post("/api/v1/auth/login", async (req, res) => {
        const { email, password } = req.body;
        
        try {
            const user = await User.findOne({ email });
            if (user && (await bycrypt.compare(password, user.password))) {
                res.status(200).json({ 
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400).json({ message: "Invalid email or password" });
            }
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ message: "Error logging in user: ", error });
        };
    });

    //get user info
    app.get("/api/v1/auth/me", authenticate, async (req, res) => {
        res.json(req.user);
    });



};
