const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    issuetype: { type: String, required: true },
    description: { type: String, required: true },
    meetingId: { type: Schema.Types.ObjectId, ref: 'Meeting' },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reportStatus: { type: String, enum: ['Pending', 'Resolved', 'Rejected'], default: 'Pending' },
    reasonForRejection: { type: String },
    resolutionDetails: { type: String }
}, 
        { timestamps: true }
);


// const ReportSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     issueType: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

mongoose.model("Report", ReportSchema);

// module.exports = mongoose.model("Report", ReportSchema);