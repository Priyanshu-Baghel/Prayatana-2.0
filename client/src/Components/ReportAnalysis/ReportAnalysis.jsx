import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { jsPDF } from "jspdf";
import Papa from "papaparse";




const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const ReportAnalysis = () => {
 const [complaints, setComplaints] = useState([]);

useEffect(() => {
  setComplaints([
    { id: 1, type: "Water Issue", count: 25, location: [28.7041, 77.1025], month: "Jan" }, 
    { id: 2, type: "Electricity", count: 15, location: [19.0760, 72.8777], month: "Feb" }, 
    { id: 3, type: "Road Maintenance", count: 10, location: [13.0827, 80.2707], month: "Mar" }, 
    { id: 4, type: "Garbage Collection", count: 30, location: [22.5726, 88.3639], month: "Apr" },
    { id: 5, type: "Water Issue", count: 40, location: [28.5355, 77.3910], month: "May" },
  ]);
}, []);

    const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Complaint Report", 20, 10);
    
    complaints.forEach((complaint, index) => {
      doc.text(`${index + 1}. ${complaint.type} - ${complaint.count} complaints (${complaint.month})`, 20, 20 + index * 10);
    });

    doc.save("complaint_report.pdf");
  };

  // 📌 Generate CSV Report
  const generateCSV = () => {
    const csv = Papa.unparse(complaints);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "complaint_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Complaint Dashboard</h1>

      {/* Bar Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Complaint Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={complaints}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3498db" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Complaint Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={complaints} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={100}>
              {complaints.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Monthly Complaint Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={complaints}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Complaint Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={complaints}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Map */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Complaint Locations</h2>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-80 w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {complaints.map((c) => (
            <Marker key={c.id} position={c.location}>
              <Popup>{c.type} - {c.count} complaints</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Download Button */}
      <div className="flex justify-center space-x-6 mt-6">
  <button
    onClick={generatePDF}
    className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
  >
    Download PDF Report
  </button>

  <button
    onClick={generateCSV}
    className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
  >
    Download CSV Report
  </button>
</div>
    </div>
    
  );
};

export default ReportAnalysis;
