// models/Complaint.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    complaintType: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    images: [String], // Stores image URLs
    videos: [String], // Stores video URLs
    status: { 
      type: String, 
      enum: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Escalated'], 
      default: 'Pending' 
    },
    priority : {
      type: String,
      enum: ['Red', 'Yellow', 'Green'],
      default: 'Green'
    },
    platform : {
      type : String,
      enum : ['Twitter', 'Sahayata-Setu'],
      default : 'Sahayata-Setu'
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
    responseMessage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);