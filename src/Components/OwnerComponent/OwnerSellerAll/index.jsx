import React, { useState } from "react";
import { Modal, Button } from "antd";

const OwnerVerifiedSellers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Demo data for verified sellers
  const verifiedSellers = [
    {
      _id: "673dbe15f3a20771b874fc61",
      name: "Aniket Chaturvedi",
      email: "aniketchaturvedi309@gmail.com",
      phone: "+1-234-567-8901",
      role: "seller",
      isVerified: true,
      createdAt: "2024-11-20T10:46:45.985Z",
    },
    {
      _id: "673dbe15f3a20771b874fc62",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+1-345-678-9012",
      role: "seller",
      isVerified: true,
      createdAt: "2024-11-21T09:15:32.123Z",
    },
    {
      _id: "673dbe15f3a20771b874fc63",
      name: "Priya Singh",
      email: "priya.singh@example.com",
      phone: "+1-456-789-0123",
      role: "seller",
      isVerified: true,
      createdAt: "2024-11-22T14:23:11.564Z",
    },
  ];

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleContactUs = (user) => {
    setSelectedUser(user);
    setIsContactModalOpen(true); // Open the contact modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleContactModalClose = () => {
    setIsContactModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Verified Sellers</h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">
            Total Verified Sellers: {verifiedSellers.length}
          </span>
        </div>
        <Button type="primary" onClick={() => handleViewDetails(verifiedSellers)}>
          View All Details
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedSellers.map((user) => (
          <div
            key={user._id}
            className="p-4 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Phone: {user.phone}</p>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => handleViewDetails(user)}>View Details</Button>
              <Button type="default" onClick={() => handleContactUs(user)}>
                Contact Us
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing seller details */}
      <Modal
        title="Seller Contact Details"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal for contacting seller */}
      <Modal
        title="Contact Seller"
        visible={isContactModalOpen}
        onCancel={handleContactModalClose}
        footer={[
          <Button key="close" onClick={handleContactModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OwnerVerifiedSellers;