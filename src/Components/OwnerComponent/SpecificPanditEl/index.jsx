import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfessionalPanditProfile = () => {
  const navigate = useNavigate(); // Hook for navigation

  const panditData = {
    name: "Pandit Ram Sharma",
    profileImage: null, // Set to image URL if available
    expertise: "Astrology, Vastu, Kundli Matching",
    age: 45,
    experience: "15 years",
    contact: "123-456-7890",
    aadhar: "1234-5678-9012",
    location: "Jaipur, Rajasthan, India",
  };

  return (
    <div
      className="min-h-[80vh] bg-gradient-to-r from-indigo-50 to-blue-100 flex justify-center items-center px-4 py-10"
      style={{ userSelect: "none" }}
    >
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl w-full px-3 py-1.5 flex flex-col gap-3">
        {/* Back Navigation Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex w-fit items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            <span className="material-icons-outlined text-base">&larr;</span>
            <span>Back</span>
          </button>

          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Delete Account
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Profile Image or Placeholder */}
          <div className="md:w-[50%] aspect-square rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gray-200">
            {panditData.profileImage ? (
              <img
                src={panditData.profileImage}
                alt="Pandit Profile"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <UserOutlined className="text-gray-500 text-9xl" />
            )}
          </div>

          <div className="lg:w-2/3 p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{panditData.name}</h2>
              <p className="text-sm text-gray-500">{panditData.location}</p>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <span className="font-semibold w-32 text-gray-500">Expertise:</span>
                <span>{panditData.expertise}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32 text-gray-500">Age:</span>
                <span>{panditData.age}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32 text-gray-500">Experience:</span>
                <span>{panditData.experience}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32 text-gray-500">Contact:</span>
                <span>{panditData.contact}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-32 text-gray-500">Aadhar:</span>
                <span>{panditData.aadhar}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPanditProfile;