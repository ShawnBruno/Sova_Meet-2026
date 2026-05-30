const express = require("express"); //npm i express

// mongoose connection
const mongoose = require("mongoose"); //npm i mongoose
require("dotenv").config(); //load environment variables from .env file

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

//Models
require("./models/User");


// Importing routes
require("./routes/meetingRoute")(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});