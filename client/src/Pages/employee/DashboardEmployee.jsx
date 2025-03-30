import { useEffect, useState } from 'react';
import React from 'react';
import { BookCopy, UserCheck, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
import SummaryApi from '../../Utils/Utils';
import { useNavigate } from "react-router-dom";

const DashboardEmployee = () => {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch(SummaryApi.Admin.getAllComplaint.url)
            .then(response => response.json())
            .then(data => setComplaints(data))
            .catch(error => console.error('Error fetching complaints:', error));
    
        fetch("https://prayatana-2-0.vercel.app/api/employees")
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);


    const SentAckEmail = async (messageId) => {
        try {
            const response = await fetch(
              `https://prayatana-2-0.vercel.app/api/admin/messages/acknowledge/${messageId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`, // Assuming you use token-based authentication
                },
              }
            );

            if (!response.ok) {
                throw new Error('Failed to send acknowledgment');
            }

            const data = await response.json();
            toast.success(data.message); // Show success message
        } catch (error) {
            console.error('Error:', error);
            toast.error('Acknowledgment not sent successfully');
        }
        
    };

    return (
        <div className="p-4 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
                <h2 className="text-xl text-gray-600">ADMIN PORTAL</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 items-center xl:grid-cols-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white transform transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Total Complaints</h3>
                        <BookCopy size={24} className="text-white" />
                    </div>
                    <p className="text-2xl font-bold mt-2">{complaints.length}</p>
                    <button className="mt-3 px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300" onClick={() => alert('Viewing complaints')}>View</button>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white transform transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Total Employees</h3>
                        <UserCheck size={24} className="text-white" />
                    </div>
                    <p className="text-2xl font-bold mt-2">{employees.length}</p>
                    <button className="mt-3 px-4 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors duration-300" onClick={() => alert('Contact to Admin')}>View</button>
                </div>
            </div>

<div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        <span>Name</span>
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Email
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Complaint Type
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Images
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                       status
                      </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Response
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {complaints.map((complaint) => (
                      <tr key={complaint._id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{complaint.name}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.email}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.complaintType}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.description}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {complaint.images.map((image, index) => (
                              <a key={index} href={image} target="_blank" rel="noopener noreferrer">
                                Image {index + 1}
                              </a>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.status}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            <button 
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                onClick={() => {navigate(`/ComplaintResponsePage/${complaint._id}`)}}
                            >
                                Response
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
};

export default DashboardEmployee;