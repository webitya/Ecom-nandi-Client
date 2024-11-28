import React, { useState } from "react";
import { Modal, Button } from "antd";

const OwnerVerifiedPandits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Demo data for verified pandits
  const verifiedPandits = [
    {
      _id: "673dbe15f3a20771b874fc61",
      name: "Aniket Pandit",
      email: "aniketpandit@gmail.com",
      phone: "+1-234-567-8901",
      role: "pandit",
      isVerified: true,
      createdAt: "2024-11-20T10:46:45.985Z",
    },
    {
      _id: "673dbe15f3a20771b874fc62",
      name: "Rajeev Pandit",
      email: "rajeevepandit@example.com",
      phone: "+1-345-678-9012",
      role: "pandit",
      isVerified: true,
      createdAt: "2024-11-21T09:15:32.123Z",
    },
    {
      _id: "673dbe15f3a20771b874fc63",
      name: "Priya Pandit",
      email: "priyapandit@example.com",
      phone: "+1-456-789-0123",
      role: "pandit",
      isVerified: true,
      createdAt: "2024-11-22T14:23:11.564Z",
    },
  ];

  const handleViewDetails = (pandit) => {
    setSelectedPandit(pandit);
    setIsModalOpen(true);
  };

  const handleContactUs = (pandit) => {
    setSelectedPandit(pandit);
    setIsContactModalOpen(true); // Show the contact modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPandit(null);
  };

  const handleContactModalClose = () => {
    setIsContactModalOpen(false);
    setSelectedPandit(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Verified Pandits</h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">
            Total Verified Pandits: {verifiedPandits.length}
          </span>
        </div>
        <Button type="primary" onClick={() => handleViewDetails(verifiedPandits)}>
          View All Details
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedPandits.map((pandit) => (
          <div
            key={pandit._id}
            className="p-4 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-bold">{pandit.name}</h2>
            <p className="text-sm text-gray-600">Email: {pandit.email}</p>
            <p className="text-sm text-gray-600">Phone: {pandit.phone}</p>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => handleViewDetails(pandit)}>View Details</Button>
              <Button type="default" onClick={() => handleContactUs(pandit)}>
                Contact Us
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing pandit details */}
      <Modal
        title="Pandit Contact Details"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedPandit && (
          <div>
            <p>
              <strong>Name:</strong> {selectedPandit.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedPandit.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPandit.phone}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal for contacting pandit */}
      <Modal
        title="Contact Pandit"
        open={isContactModalOpen}
        onCancel={handleContactModalClose}
        footer={[
          <Button key="close" onClick={handleContactModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedPandit && (
          <div>
            <p>
              <strong>Email:</strong> {selectedPandit.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPandit.phone}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OwnerVerifiedPandits;
