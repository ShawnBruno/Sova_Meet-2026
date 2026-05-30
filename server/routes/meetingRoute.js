const mongoose = require("mongoose");
const user = mongoose.model("User");
//const handleMeeting = require("../data/meeting");

module.exports = (app) => {
    // Route to get user data
    app.get("/api/v1/get/users", async (req, res) => {
        console.log("Received GET request at /api/v1/get/users to get all users data");
        
        try {
        const response = await user.find({});

        res.status(200).json({ message: "Users retrieved successfully", response });
        } catch (error) {
            console.error("Error: ", error);
            res.status(200).json({ message: "Error retrieving users: ", error });
        }finally {
            console.log("Finally: GET request at /api/v1/get/users completed");
        }
        // res.send(handleMeeting);
    });


    //get specific user data
    app.get("/api/v1/get/user/:id", async (req, res) => {
        console.log("Received GET request at /api/v1/get/user/:id to get specific user data");

        try {
        const { id } = req.params;
        const response = await user.findById(id);

        res.status(200).json({ message: "User retrieved successfully", response });
    } catch (error) {
            console.error("Error: ", error);
            res.status(200).json({ message: "Error retrieving user: ", error });
        }finally {
            console.log("Finally: GET request at /api/v1/get/user/:id completed");
        }
    });



    //Add user info
    app.post("/api/v1/add/user", async (req, res) => {
        console.log("Received POST request at /api/v1/add/user with data: to add user info");
        
        try {
        const { name, email, password } = req.body;

        const newUser = await user.findOne({ name }); // Check if user already exists
        if (newUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const Userfields = { name, email, password };

        const response = await user.create(Userfields);

        res.status(201).json({ message: "User added successfully", response });
    } catch (error) {
            console.error("Error: ", error);
            res.status(200).json({ message: "Error adding user: ", error });
        }finally {
            console.log("Finally: POST request at /api/v1/add/user completed");
        }


    });

    //update user info
    app.put("/api/v1/update/user/:id", async (req, res) => {
        console.log("Received PUT request at /api/v1/update/user/:id with data: to update user info");
        
        try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const response = await user.updateOne({_id: id}, { name, email, password }); // Check if user already exists

        res.status(201).json({ message: "User updated successfully", response });
    } catch (error) {
            console.error("Error: ", error);
            res.status(200).json({ message: "Error updating user: ", error });
        }finally {
            console.log("Finally: PUT request at /api/v1/update/user/:id completed");
        }


    });


    //delete user info
    app.delete("/api/v1/delete/user/:id", async (req, res) => {
        console.log("Received DELETE request at /api/v1/delete/user/:id to delete user info");
        const { id } = req.params;

        try {
            const response = await user.findByIdAndDelete(id); // Check if user already exists and delete it
            res.status(200).json({ message: "User deleted successfully", response });
        } catch (error) {
            console.error("Error: ", error);
            res.status(200).json({ message: "Error deleting user: ", error });
        }finally {
            console.log("Finally: DELETE request at /api/v1/delete/user/:id completed");
        }
    });



}


