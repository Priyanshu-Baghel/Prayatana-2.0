import { useState } from "react";
import { Search, ClipboardList, Mail, AlertTriangle, CheckCircle, Circle, History } from "lucide-react";

const ComplaintTracker = () => {
    const [complaintId, setComplaintId] = useState("");
    const [complaint, setComplaint] = useState(null);
    const [error, setError] = useState("");

    const staticComplaintData = {
        _id: "R54321",
        name: "Priyanshu Baghel",
        email: "Priyanshubaghel2003.com",
        status: "In Progress",
        description: "Issue with Road Street.",
        updates: [
            { date: "2025-03-01", message: "Complaint received and under review." },
            { date: "2025-03-02", message: "Assigned to the support team." },
            { date: "2025-03-03", message: "Issue identified and resolution in progress." },
        ],
    };

    const handleTrackComplaint = () => {
        setError("");
        setComplaint(null);

        if (!complaintId) {
            setError("Please enter a valid Complaint ID.");
            return;
        }

        if (complaintId === staticComplaintData._id) {
            setComplaint(staticComplaintData);
        } else {
            setError("Complaint not found. Please check the ID and try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-black-600" /> Track Your Complaint
            </h2>

            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Enter Complaint ID"
                    className="w-full p-2 border rounded-md pl-10"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>

            <button
                className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-black"
                onClick={handleTrackComplaint}
            >
                <Search className="w-5 h-5" /> Track Complaint
            </button>

            {error && <p className="text-red-500 mt-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> {error}</p>}

            {complaint && (
                <div className="mt-6 p-4 border rounded-md bg-gray-100">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-blue-600" /> Complaint Details
                    </h3>
                    <p className="flex items-center gap-2"><strong>ID:</strong> {complaint._id}</p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-600" /> <strong>Email:</strong> {complaint.email}</p>
                    <p><strong>Status:</strong> <span className="text-blue-600">{complaint.status}</span></p>
                    <p><strong>Description:</strong> {complaint.description}</p>

                    {complaint.updates?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <History className="w-5 h-5 text-blue-600" /> Complaint History
                            </h4>
                            <div className="flex items-center justify-between mt-6 relative">
                                {complaint.updates.map((update, index) => (
                                    <div key={index} className="flex flex-col items-center text-center w-1/3 relative">
                                        {/* Dotted Line Between Steps */}
                                        {index > 0 && (
                                            <div className="absolute top-4 left-[-50%] w-full h-1 border-t-2 border-dotted border-black -z-10"></div>
                                        )}
                                        
                                        {/* Step Icons */}
                                        <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white
                                            ${index === complaint.updates.length - 1 ? "bg-green-500" : "bg-blue-500"}
                                        `}>
                                            {index === complaint.updates.length - 1 ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                        </div>
                                        <p className="text-sm mt-2"><strong>{update.date}:</strong> {update.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ComplaintTracker;
