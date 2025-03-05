import { useState } from "react";

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaintType: "",
    description: "",
    images: [],
    videos: [],
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === "image") {
      setFormData({ ...formData, images: [...formData.images, ...files] });
      setPreviews([...previews, ...files.map((file) => URL.createObjectURL(file))]);
    } else if (type === "video") {
      setFormData({ ...formData, videos: [...formData.videos, ...files] });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format.";
    if (!formData.complaintType) newErrors.complaintType = "Please select a complaint type.";
    if (formData.description.length < 10) newErrors.description = "Description should be at least 10 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    setMessage("");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("complaintType", formData.complaintType);
  formDataToSend.append("description", formData.description);

  // Append images
  formData.images.forEach((image) => {
    formDataToSend.append("images", image);
  });

  // Append videos
  formData.videos.forEach((video) => {
    formDataToSend.append("videos", video);
  });

  try {
    const response = await fetch("http://localhost:8000/api/complaints/submit", {
      method: "POST",
      body: formDataToSend,
    });

    const result = await response.json();
    console.log(result);
    
    if (response.ok) {
      setMessage("Complaint submitted successfully!");
      setFormData({
        name: "",
        email: "",
        complaintType: "",
        description: "",
        images: [],
        videos: [],
      });
      setPreviews([]);
    } else {
      setMessage(result.error || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error submitting complaint:", error);
    setMessage("Failed to submit complaint. Please try again.");
  }
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Submit a Complaint</h2>
        {message && (
          <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center mb-6">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Type</label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select Type</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity</option>
              <option value="road">Road Maintenance</option>
              <option value="sanitation">Sanitation</option>
            </select>
            {errors.complaintType && <p className="text-red-500 text-sm mt-2">{errors.complaintType}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Describe your complaint"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "image")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="flex flex-wrap mt-4 gap-2">
              {previews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Videos (Optional)</label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, "video")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black to-black text-white py-3 px-6 rounded-lg hover:from-black hover:to-black transition-all transform hover:scale-105"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}