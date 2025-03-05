const express = require("express");
const Employee = require("../../models/employees/employeeModel");
const Complaint = require("../../models/complaint/complaintModel");

const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// adding employee
router.post("/", async (req, res) => {
  try {
    const { name, email, employeeId, department, role, isActive } = req.body;

    // Check if email or employeeId already exists
    const existingEmployee = await Employee.findOne({ 
      $or: [{ email }, { employeeId }] 
    });

    if (existingEmployee) {
      return res.status(400).json({ error: "Email or Employee ID already exists" });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      employeeId,
      department,
      role,
      isActive,
    });

    // Save employee to database
    await newEmployee.save();
    
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post

module.exports = router;
