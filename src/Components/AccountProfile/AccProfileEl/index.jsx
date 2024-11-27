import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Tooltip, Modal } from 'antd';
import {
  HomeOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProfileEditEl from './ProfileEditEl';

const AccProfileEl = () => {

  const userState = useSelector((state) => state.user.value)
  console.log(userState);
  const [isEditable, setIsEditable] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteAccount = () => {
    // Handle delete logic here
    setDeleteModalVisible(false);
  };

  const handleEditClick = () => {
    setIsEditable(true)
  }

  const renderEditableField = (label, field) => (
    <div className="flex flex-row sm:items-center mb-4">
      <label className=" font-medium sm:font-semibold sm:w-40 w-full mb-2 sm:mb-0">{label}:</label>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <p
          className="w-full sm:w-64 text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {userState[field]}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {
        isEditable ?

          <ProfileEditEl setEditable={setIsEditable} />
          :
          <div className="p-6 bg-white shadow-lg rounded-lg w-full mb-4" style={{ userSelect: "none" }}>
            <div className='flex items-center justify-between mb-6'>
              <h2 className="sm:text-3xl text-xl font-bold text-gray-800 ">Profile Information</h2>
              <button
                type="link"
                className="px-3 py-1 rounded-sm bg-blue-500 text-white transition-colors duration-300"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>

            {/* Editable Fields */}
            {renderEditableField('First Name', 'fname')}
            {renderEditableField('Last Name', 'lname')}
            {renderEditableField('Email', 'email')}
            {(userState.role !== 'user' && userState.role !== null) && renderEditableField('Role', 'role')}

            {/* Navigation Buttons */}
            <div className="sm:mt-8 sm:flex sm:flex-wrap gap-4">
              <Link href="/cart">
                <Button
                  type="primary"
                  icon={<CreditCardOutlined />}
                  className="bg-blue-600 hover:bg-blue-700 hidden sm:block"
                >
                  Go to Cart
                </Button>
              </Link>
              <Link href="/address">
                <Button
                  type="default"
                  icon={<EnvironmentOutlined />}
                  className="bg-green-600 hover:bg-green-700 text-white hidden sm:block"
                >
                  Address Manager
                </Button>
              </Link>
              <Link href="/">
                <Button
                  type="link"
                  icon={<HomeOutlined />}
                  className="text-gray-600 hover:text-red-500 hidden sm:block"
                >
                  Home Page
                </Button>
              </Link>
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                className="bg-red-600"
                onClick={() => setDeleteModalVisible(true)}
              >
                Delete Account
              </Button>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
              title="Delete Account"
              open={deleteModalVisible}
              onOk={handleDeleteAccount}
              onCancel={() => setDeleteModalVisible(false)}
              okText="Yes, Delete"
              okButtonProps={{ danger: true }}
            >
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            </Modal>
          </div>
      }
    </>
  );
};

export default AccProfileEl;