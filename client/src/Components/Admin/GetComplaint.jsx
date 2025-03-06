import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../../Utils/Utils';

const GetComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

const colorMap = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
};

// Example: Randomly select a color
const colors = ['red', 'green', 'yellow'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];


  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(SummaryApi.Admin.getAllComplaint.url); // Assuming the endpoint is /api/complaints
        const data = await response.json();

        // Add random priority colors to all complaints
        const updatedComplaints = data.map(complaint => ({
          ...complaint,
          priorityColor: randomColor,
        }));

        setComplaints(updatedComplaints);
        setFilteredComplaints(updatedComplaints); // Initialize filtered complaints with all data
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  // Function to get a random color (Red, Yellow, Green)
  const getRandomColor = () => {
    const colors = ['red', 'yellow', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to filter complaints by state and city
  const filterComplaints = (state, city) => {
    let filtered = complaints;

    if (state) {
      filtered = filtered.filter(complaint => complaint.state === state);
    }

    if (city) {
      filtered = filtered.filter(complaint => complaint.city === city);
    }

    setFilteredComplaints(filtered);
  };

  // Handle state change
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity(''); // Reset city when state changes
    filterComplaints(state, '');
  };

  // Handle city change
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    filterComplaints(selectedState, city);
  };

  // Get unique states and cities for dropdowns
  const states = [...new Set(complaints.map(complaint => complaint.state))];
  const cities = [
    ...new Set(
      complaints
        .filter(complaint => complaint.state === selectedState)
        .map(complaint => complaint.city)
    ),
  ];

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
          <Link to='/complaint'>
            <div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new complaint
              </button>
            </div>
          </Link>
        </div>

        {/* Filter Section */}
        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              id="city"
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Priority
                      </th>
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
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Platform
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        State
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        City
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint._id}>
                          <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">
                             <span
                                  className={`inline-block h-3 w-3 rounded-full ${
                                  complaint.name === "Muskan Shukla" ? "bg-green-500" : 
                                  complaint.name === "Navneet" ? "bg-yellow-500" : 
                                  "bg-red-500"
                                }`}
                              ></span>
                          </div>
                        </td>
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
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.platform}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.state}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900">{complaint.city}</div>
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