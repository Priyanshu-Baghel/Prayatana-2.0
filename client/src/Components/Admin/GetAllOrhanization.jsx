import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GetAllOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          "https://prayatana-2-0.vercel.app/api/organizations"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-black">Organizations</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all organizations. You can add new ones, edit, or delete existing ones.
            </p>
          </div>
          <div>
            <Link to="/admin/addOrganization">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add New Organization
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Organization Name
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Address
                      </th>
                      <th className="px-12 py-3.5 text-left text-sm font-normal text-gray-500">
                        Contact Email
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Contact Phone
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        User Role
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Employee Name
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Employee ID
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {organizations.map((org) => (
                      <tr key={org._id} className="border-t border-gray-200">
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {org.organizationName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {org.address}
                        </td>
                        <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">
                          {org.contactEmail}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {org.contactPhone}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {org.userRoles}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {org.employeeName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {org.employeeId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                          <Link to={`/admin/editOrganization/${org._id}`}>
                            <span className="text-gray-500 hover:text-black cursor-pointer">
                              Edit
                            </span>
                          </Link>
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

export default GetAllOrganizations;
