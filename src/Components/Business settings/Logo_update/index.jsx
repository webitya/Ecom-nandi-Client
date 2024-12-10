import React, { useState } from "react";


const LogoUpdate = () => {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
    e.target.value = null; // Reset input
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFavicon(URL.createObjectURL(file));
    }
    e.target.value = null; // Reset input
  };

  const handleRemoveLogo = () => {
    setLogo(null); // Clear logo
  };

  const handleRemoveFavicon = () => {
    setFavicon(null); // Clear favicon
  };


  return (
    <div className="w-full bg-gray-100 flex items-center justify-center flex-col py-0 mt-5">
      <div className="w-full md:w-12/12 lg:w-12/12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg">
        {/* Left Column: Logo Update */}
        <div className="flex flex-col items-center justify-center p-2 border border-blue-300 rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-lg font-bold text-blue-600 mb-4">Update Logo</h2>
          <div className="relative w-full h-[20rem] border-dashed border-2 border-blue-500 rounded-lg flex items-center justify-center bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors">
            {logo ? (
              <>
                <img
                  src={logo}
                  alt="Logo Preview"
                  className="object-contain rounded-lg"
                  style={{ maxWidth: "470", maxHeight: "310px" }}
                />
                <button
                  onClick={handleRemoveLogo}
                  className="absolute top-2 right-2 bg-blue-500 text-white"
                  style={{borderRadius:"20px",height:"1.5rem",width:"1.5rem"}}
                >
                  X
                </button>
              </>
            ) : (
              <label
                htmlFor="logoUpload"
                className="text-blue-600 w-full h-[269px] flex items-center justify-center"
              >
                Please select a logo
              </label>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logoUpload"
            />
          </div>
        </div>

        {/* Right Column: Favicon Update */}
        <div className="flex flex-col items-center justify-center p-2 border border-blue-300 rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-lg font-bold text-blue-600 mb-4">Change Favicon</h2>
          <div className="relative w-full h-[100px] border-dashed border-2 border-blue-500 rounded-lg flex items-center justify-center bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors">
            {favicon ? (
              <>
                <img
                  src={favicon}
                  alt="Favicon Preview"
                  className="object-contain rounded"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <button
                  onClick={handleRemoveFavicon}
                  className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-0"
                  style={{borderRadius:"20px",height:"1.5rem",width:"1.5rem"}}
                >
                  X
                </button>
              </>
            ) : (
              <label
                htmlFor="faviconUpload"
                className="text-blue-600 w-full h-[100px] flex items-center justify-center"
              >
                Please select a favicon
              </label>
            )}
            <input
              id="faviconUpload"
              type="file"
              accept="image/*"
              onChange={handleFaviconUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default LogoUpdate;
