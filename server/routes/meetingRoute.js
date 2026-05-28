const mongoose = require("mongoose");
const user = mongoose.model("User");
//const handleMeeting = require("../data/meeting");

module.exports = (app) => {
    // Route to get meeting data
    app.get("/get/meetings", async (req, res) => {
        console.log("Received GET request at /get/meetings");

        const response = await user.find({});

        res.status(200).json({ message: "Meetings retrieved successfully", response });
        // res.send(handleMeeting);
    });

    //Add meeting route
    app.post("/add/meeting", async (req, res) => {
        console.log("Received POST request at /add/meeting with data:");
        
        const { name, email, password } = req.body;

        const newUser = await user.findOne({ name }); // Check if user already exists
        if (newUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const Userfields = { name, email, password };

        const response = await user.create(Userfields);

        res.status(201).json({ message: "User added successfully", response });


    });



}


