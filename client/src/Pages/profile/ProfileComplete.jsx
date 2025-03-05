import React, { useEffect, useState } from "react";
import SummaryApi from "../../Utils/Utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const stateCityData = {
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
  "Karnataka": ["Bengaluru", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
};

const ProfileComplete = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user._id);

  const [formData, setFormData] = useState({
    user_id: "",
    phone_no: "",
    alternative_phone_no: "",
    address: "",
    landmark: "",
    state: "",
    city: "",
    language: "",
    complaint_interest: "", // Updated field name
    twitter: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_id: user._id,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.profile.url, {
        method: SummaryApi.profile.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Profile Status : ", data.message);
        toast(data.message);
        setFormData({
          user_id: "",
          phone_no: "",
          alternative_phone_no: "",
          address: "",
          landmark: "",
          state: "",
          city: "",
          language: "",
          complaint_interest: "", // Updated field name
          twitter: "",
        });
        navigate("/profile");
      } else {
        console.log("Network error");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="px-5 py-5 lg:mt-5 md:px-40 w-full">
      <h1 className="text-md lg:text-xl font-medium px-3 border-b pb-3">
        Complete Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="py-5">
        <div className="w-full flex flex-wrap gap-5 px-3 items-center">
          {/* Phone Number */}
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="number"
                name="phone_no"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Enter Your Phone Number"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Alternative Phone Number */}
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="number"
                name="alternative_phone_no"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Enter Alternative Phone Number"
                value={formData.alternative_phone_no}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="address"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Enter Your Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Landmark */}
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="landmark"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Enter Landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* State */}
  {/* State Dropdown */}
          <div className="my-2 lg:w-1/3 w-full bg-white shadow-md rounded-xl">
            <div className="p-4">
              <select
                name="state"
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Your State
                </option>
                {Object.keys(stateCityData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* City */}
          {/* City Dropdown (dependent on state) */}
          <div className="my-2 lg:w-1/3 w-full bg-white shadow-md rounded-xl">
            <div className="p-4">
              <select
                name="city"
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
              >
                <option value="" disabled>
                  {formData.state ? "Select Your City" : "Select State First"}
                </option>
                {formData.state &&
                  stateCityData[formData.state].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Language */}
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <select
                name="language"
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Your Language
                </option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">Tamil</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Kannada">Kannada</option>
                <option value="Odia">Odia</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Assamese">Assamese</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
          </div>

          {/* Complaint Interest */}
          {/* Complaint Category */}
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <select
                name="complaint_interest" // Updated to civic complaints
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.complaint_interest || ""}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Your Complaint Category
                  
                </option>
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
          </div>

          {/* Twitter */}
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="twitter"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Enter Twitter Profile Link"
                value={formData.twitter}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileComplete;