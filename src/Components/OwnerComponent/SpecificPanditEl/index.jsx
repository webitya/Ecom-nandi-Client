import React from "react";
import { useNavigate } from "react-router-dom";

const ProfessionalPanditProfile = () => {
  const navigate = useNavigate(); // Hook for navigation

  const panditData = {
    name: "Pandit Ram Sharma",
    profileImage: "https://via.placeholder.com/800x1000",
    expertise: "Astrology, Vastu, Kundli Matching",
    age: 45,
    experience: "15 years",
    contact: "123-456-7890",
    aadhar: "1234-5678-9012",
    location: "Jaipur, Rajasthan, India",
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-indigo-50 to-blue-100 flex justify-center items-center px-4 py-10" style={{userSelect:"none"}}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
        {/* Back Navigation Button */}
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md shadow hover:bg-gray-200 transition-colors duration-200"
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Profile Image */}
          {/* <div className="lg:w-1/3 bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4"> */}
            <img
              src="/pj.jpg"
              alt="Pandit Profile"
              className="md:w-[50%] h-auto rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            />
          {/* </div> */}

          {/* Right Section - Details */}
          <div className="lg:w-2/3 p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{panditData.name}</h2>
              <p className="text-sm text-gray-500">{panditData.location}</p>
            </div>

            {/* Details */}
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