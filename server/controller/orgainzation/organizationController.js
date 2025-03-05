// controllers/organizationController.js
const Organization = require('../../models/organization/organizationModel');

const addOrganization = async (req, res) => {
    try {
        const { organizationName, address, contactEmail, contactPhone, userRoles, employeeName, employeeId } = req.body;

        // Validate required fields
        if (!organizationName || !address || !contactEmail || !contactPhone || !userRoles || !employeeName || !employeeId) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if employee ID already exists
        const existingEmployee = await Organization.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ msg: 'Employee ID must be unique' });
        }

        // Create a new organization
        const newOrganization = new Organization({
            organizationName,
            address,
            contactEmail,
            contactPhone,
            userRoles,
            employeeName, // Include new field
            employeeId // Include new field
        });

        // Save the organization to the database
        await newOrganization.save();

        // Send success response
        res.status(201).json({ msg: 'Organization added successfully', organization: newOrganization });
    } catch (error) {
        console.error('Error adding organization:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { addOrganization };