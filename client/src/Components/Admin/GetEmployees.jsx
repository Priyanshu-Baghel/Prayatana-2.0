import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../../Utils/Utils';

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employees");

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

        const data = await response.json();
        console.log(data);
        
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-black">Employees</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new employees, edit, or delete existing ones.
            </p>
          </div>
          <div>
            <Link to="/admin/addEmployee">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add New Employee
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
                        Employee ID
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Name
                      </th>
                      <th className="px-12 py-3.5 text-left text-sm font-normal text-gray-500">
                        Email
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Role
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Department
                      </th>
                      <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                        Status
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {employees.map((employee) => (
                      <tr key={employee._id} className="border-t border-gray-200">
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                          {employee.employeeId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">{employee.email}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {employee.role === "admin" ? (
                            <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                              Admin
                            </span>
                          ) : employee.role === "sub-admin" ? (
                            <span className="inline-flex rounded-full bg-purple-100 px-2 text-xs font-semibold leading-5 text-purple-800">
                              Sub-Admin
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Employee
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {employee.department || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {employee.isActive ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                          <Link to={`/admin/editEmployee/${employee._id}`}>
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

export default GetEmployees;
