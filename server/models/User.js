const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: { type: String },
        meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
        suspended: { type: Boolean, default: false }
    }, 
        { timestamps: true }
);

mongoose.model("User", userSchema);


