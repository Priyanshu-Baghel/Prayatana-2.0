// models/Organization.js
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true
    },
    userRoles: {
        type: String,
        required: true,
        enum: ['admin', 'sub-admin', 'employees'], // Ensures only valid roles are accepted
        trim: true
    }, 
    employeeName: { // New field
        type: String,
        required: true,
        trim: true
    },
    employeeId: { // New field
        type: String,
        required: true,
        trim: true,
        unique: true // Ensure employee ID is unique
    }
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);