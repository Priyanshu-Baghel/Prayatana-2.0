import React, { useEffect, useState } from 'react';
import SummaryApi from '../../Utils/Utils';

const GetComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(SummaryApi.Admin.getAllComplaint.url); // Assuming the endpoint is /api/complaints
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-black">Complaints</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all complaints. You can view, edit, or resolve complaints.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new complaint
            </button>
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
                        Videos
                      </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        status
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
                          <div className="text-sm text-gray-900">
                            {complaint.videos.map((video, index) => (
                              <a key={index} href={video} target="_blank" rel="noopener noreferrer">
                                Video {index + 1}
                              </a>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.status}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetComplaint;