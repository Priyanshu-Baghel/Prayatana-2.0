// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true }, // Department of the employee
  role: { type: String, enum: ['admin', 'sub-admin', 'employee'], default: 'employee' }, // Role in the organization
  isActive: { type: Boolean, default: true }, // Whether the employee is active
  assignedComplaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }] // Complaints assigned to the employee
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);