import React, { useState } from "react";

const AssignTask = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    role: "employee",
    isActive: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const generateEmployeeId = () => {
    return "EMP" + Math.floor(1000 + Math.random() * 9000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.department) {
      setError("Please fill all required fields.");
      return;
    }

    const finalData = {
      ...formData,
      employeeId: formData.employeeId || generateEmployeeId(),
    };

    try {
      const response = await fetch(
        "https://prayatana-2-0.vercel.app/api/employees",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      if (response.ok) {
        setSuccess("Employee added successfully!");
        setFormData({
          name: "",
          email: "",
          employeeId: "",
          department: "",
          role: "employee",
          isActive: true,
        });
      } else {
        setError("Failed to add employee. Email or Employee ID might be duplicate.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Assign Task to Employee 
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Complaint ID (Auto-generated if left blank)
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
            required
          >

            {/* ['Electricity', 'Education', 'Healthcare', 'Waste Management',
       'Sanitation', 'Street Lighting', 'Public Transport',
       'Road Infrastructure', 'Water Supply', 'Traffic Management',
       'Pollution'] */}
            <option value="">Select Department</option>
            <option value="Electricity">Electricity</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Street Lighting">Street Lighting</option>
            <option value="Public Transport">Public Transport</option>
            <option value="Road Infrastructure">Road Infrastructure</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Traffic Management">Traffic Management</option>
            <option value="Pollution">Pollution</option>            
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role Level</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          >
            <option value="admin">Level-1</option>
            <option value="sub-admin">Level-2</option>
            <option value="employee">Level-3</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Active</label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-black transition"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
