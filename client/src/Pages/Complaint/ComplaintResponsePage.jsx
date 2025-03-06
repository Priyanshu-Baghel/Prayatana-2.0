import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"

const ComplaintResponsePage = () => {
    const { id } = useParams(); // Get complaint ID from URL
    const [complaint, setComplaint] = useState(null);
    const [responseText, setResponseText] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/complaints/${id}`)
            .then(response => response.json())
            .then(data => setComplaint(data))
            .catch(error => console.error("Error fetching complaint:", error));
    }, [id]);

    console.log(complaint);
    

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/complaints/respond/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ response: responseText }),
            });

            if (!response.ok) throw new Error("Failed to send response");

            alert("Response sent successfully!");
        } catch (error) {
            console.error("Error:", error);
            setResponseText("");
            toast.success("Response sent successfully!");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Respond to Complaint</h1>
            {complaint ? (
                <div>
                    <p><strong>Name:</strong> {complaint.name}</p>
                    <p><strong>Email:</strong> {complaint.email}</p>
                    <p><strong>Complaint Type:</strong> {complaint.complaintType}</p>
                    <p><strong>Description:</strong> {complaint.description}</p>
                    <textarea
                        className="w-full border p-2 mt-3"
                        placeholder="Write your response here..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                    ></textarea>
                    <button
                        className="mt-3 bg-black text-white px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                    >
                        Send Response
                    </button>
                </div>
            ) : (
                <p>Loading complaint details...</p>
            )}
        </div>
    );
};

export default ComplaintResponsePage;
