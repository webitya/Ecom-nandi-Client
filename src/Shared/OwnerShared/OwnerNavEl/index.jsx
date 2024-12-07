import { CaretDownFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";

const OwnerNavEl = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown on click
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="relative">
          <img src="/Logo-nandi.png" alt="brand-logo" className="w-[90px]" />
        </div>

        <div className="flex items-center space-x-6 text-gray-700">
          <div className="relative cursor-pointer">
            <ShoppingCartOutlined className="text-2xl" />
          </div>

          <div
            className="flex items-center gap-2 transition-all duration-200 border border-gray-600 rounded-3xl px-2 py-1 hover:bg-blue-100 cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            <CaretDownFilled />
            <span className="font-semibold text-sm">Utkarsh Kumar (Admin)</span>
            <div className="w-8 h-8 rounded-full bg-blue-500">
              <img src="/Logo-nandi.png" alt="profile" className="w-8 h-8 object-cover rounded-full" />
            </div>
          </div>

          {isDropdownOpen && (
            <div
              className={`absolute top-full right-0 bg-white shadow-lg rounded-md w-64 p-4 text-gray-700
                transform transition-all duration-300 ease-in-out opacity-100 translate-y-0 ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0" // Visible and in place
                    : "opacity-0 translate-y-4"   // Hidden and moved up
                }`}
            >
              {/* User Info Header */}
              <div className="flex items-center space-x-3 mb-4 border-b border-gray-300 pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-500">
                  <img src="/Logo-nandi.png" alt="profile" className="w-12 h-12 object-cover rounded-full" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Utkarsh Kumar</p>
                  <p className="text-xs text-gray-500">utkarsh.kumar@email.com</p>
                </div>
              </div>

              {/* Dropdown Options */}
              <ul>
                <li className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer">Dashboard</li>
                <li className="p-2 hover:bg-blue-100 rounded-lg cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavEl;
