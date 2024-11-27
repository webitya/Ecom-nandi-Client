import React, { useState } from "react";
import { Modal, Button } from "antd";

const OwnerPanditRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Demo data
  const users = [
    {
      _id: "673dbe15f3a20771b874fc61",
      name: "Aniket Chaturvedi",
      email: "aniketchaturvedi309@gmail.com",
      role: "pandit",
      isVerified: false,
      createdAt: "2024-11-20T10:46:45.985Z",
    },
    {
      _id: "673dbe15f3a20771b874fc62",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      role: "pandit",
      isVerified: true,
      createdAt: "2024-11-21T09:15:32.123Z",
    },
    {
      _id: "673dbe15f3a20771b874fc63",
      name: "Priya Singh",
      email: "priya.singh@example.com",
      role: "pandit",
      isVerified: false,
      createdAt: "2024-11-22T14:23:11.564Z",
    },
  ];

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAcceptRequest = (id) => {
    console.log(`Accepted request for user ID: ${id}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pandit Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">
              Request Date: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4 flex justify-between">
              <Button
                type="primary"
                onClick={() => handleAcceptRequest(user._id)}
              >
                Accept Request
              </Button>
              <Button onClick={() => handleViewDetails(user)}>View Details</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        title="Pandit Details"
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
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Verified:</strong>{" "}
              {selectedUser.isVerified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Request Date:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OwnerPanditRequest;
