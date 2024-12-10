import React, { useState } from "react";

const CompanyInformation = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    email: "",
    country: "",
    timeZone: "",
    language: "",
    companyAddress: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { latitude, longitude } = formData;

  return (
    <div className="min-h w-full p-1 pb-0 bg-white shadow-lg rounded-lg mt-2">
      <h1 className="text-3xl font-semibold text-blue-700 mb-8 pb-0">
        Company Information
      </h1>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-6 bg-blue-50 rounded-lg shadow-inner">
        <div>
          <label className="block font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full h-[35px] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 caret-blue-500 hover:shadow-lg transition duration-200"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full h-[35px] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 caret-blue-500 hover:shadow-lg transition duration-200"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full h-[35px] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 caret-blue-500 hover:shadow-lg transition duration-200"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block font-medium text-gray-700">Company Address</label>
          <textarea
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 caret-blue-500 hover:shadow-lg transition duration-200"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="mt-1 block w-full h-[35px] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 caret-blue-500 hover:shadow-lg transition duration-200"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="mt-1 block w-full border h-[35px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 caret-blue-500 hover:shadow-lg transition duration-200"
          />
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="mt-8 p-2">
        <h2 className="text-[25px] font-bold text-blue-600 mb-0">Google Map</h2>
        <div className="w-full h-fit rounded-lg shadow-md overflow-hidden">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            src={`https://www.google.com/maps?q=${latitude || 0},${longitude || 0}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;