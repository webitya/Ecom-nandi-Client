import { useState, useEffect } from 'react';
import { Radio, Button, Modal, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRequestApi } from '../../../hooks/useRequestApi';
import { AccAddressFormEl } from './AccAddressFormEl';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../../redux/features/addressSlices/AddressSlice';
import { div } from 'framer-motion/client';

const addressSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    contactNo: z.string()
        .length(10, 'Contact number must be exactly 10 digits')
        .regex(/^[0-9]{10}$/, 'Contact number must be a valid 10-digit number'),

    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    zipCode: z.string()
        .regex(/^[0-9]+$/, 'Zip code must be numeric and contain only digits')
        .min(1, 'Zip code is required'),
});

const AccAddressEl = ({ userId }) => {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [formState, setFormState] = useState(null);
    const [schemaErrors, setSchemaErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const addresses = useSelector(state => state.address.value)
    const dispatch = useDispatch()
    const [pageLoader, setPageLoader] = useState(false)

    useEffect(() => {
        const fetchAddresses = async () => {
            setPageLoader(true)
            try {
                const response = await useRequestApi('api/address/getAddress', 'GET');
                const data = response.data;
                console.log(data);
                dispatch(setAddress(data))
                // setAddresses(data);
                const defaultAddress = data.find(address => address.default);
                if (defaultAddress) {
                    setSelectedAddressId(defaultAddress._id);
                }
            } catch (error) {
                toast.error('Failed to fetch addresses');
            } finally {
                setPageLoader(false)
            }
        };
        if (addresses.length === 0) {
            fetchAddresses();
        }
    }, []);

    const handleSelectAddress = async (addressId) => {
        try {
            const response = await useRequestApi(`api/address/setDefault?id=${addressId}`, 'PATCH');
            const updatedAddresses = addresses.map((address) =>
                address._id === addressId ? { ...address, default: true } : { ...address, default: false }
            );
            dispatch(setAddress(updatedAddresses))
            // setAddresses(updatedAddresses);
            setSelectedAddressId(addressId);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formState);

        const validation = addressSchema.safeParse(formState);
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});
            setLoading(false);
            setSchemaErrors(errors);
            return;
        }

        try {
            if (formState._id) {
                const response = await useRequestApi(`api/address/updateAddress?id=${formState._id}`, 'PATCH', {
                    ...formState,
                });
                const updateData = addresses.map((address) =>
                    address._id === formState._id ? { ...formState } : address
                )
                dispatch(setAddress(updateData))
                // setAddresses(updateData)
                toast.success('Address updated successfully!');
            } else {
                const response = await useRequestApi('api/address/addAddress', 'POST', { ...formState });
                const updateData = [
                    ...addresses,
                    { ...formState, ...response.data },
                ]

                dispatch(setAddress(updateData))
                toast.success('New address added successfully!');
            }
        } catch (error) {
            console.log(error);

            toast.error('An error occurred while saving the address.');
        } finally {
            setLoading(false);
        }

        setFormState(null);
        setSchemaErrors({});
    };

    const handleFormChange = (e) => {
        setSchemaErrors({})
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleEditAddress = (addressId) => {
        const addressToEdit = addresses.find((address) => address._id === addressId);
        setFormState(addressToEdit);
    };

    const handleAddAddress = () => {
        setFormState({
            fullName: '',
            contactNo: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            default: false,
        });
    };

    const handleDeleteAddress = async () => {
        if (addressToDelete) {
            try {
                const response = await useRequestApi(`api/address/deleteAddress?id=${addressToDelete}`, 'PATCH');
                const updateData = addresses.filter((address) => address._id !== addressToDelete)
                dispatch(setAddress(updateData))
                // setAddresses(updateData);
                toast.success('Address deleted successfully!');
                setIsModalVisible(false);
            } catch (error) {
                console.log(error);

                toast.error('An error occurred while deleting the address.');
                setIsModalVisible(false);
            }
        }
    };

    const showDeleteModal = (addressId) => {
        setAddressToDelete(addressId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormClose = () => {
        setFormState(null)
    }



    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Addresses</h2>
            {
                pageLoader &&
                <div className="flex justify-center items-center ">
                    <Spin size="large" />
                </div>

            }

            <div className="space-y-4">

                {!pageLoader && (addresses && addresses.length ? addresses.map((address) => (
                    <div key={address._id} className="border-b pb-4 mb-4">
                        <Radio.Group
                            onChange={() => handleSelectAddress(address._id)}
                            value={selectedAddressId || (address.default ? address._id : null)}
                            className="w-full"
                        >
                            <Radio value={address._id} className="flex items-center space-x-3">
                                <div>
                                    <p className="font-semibold">{address.fullName}</p>
                                    <p>{address.address}, {address.city}, {address.state}, {address?.contactNo}, {address.country} - {address.zipCode}</p>
                                </div>
                            </Radio>
                        </Radio.Group>

                        <div className="flex justify-between items-center mt-2">
                            <Button
                                type="link"
                                onClick={() => handleEditAddress(address._id)}
                                icon={<EditOutlined />}
                                className="text-yellow-500 hover:text-yellow-700"
                            >
                                Edit
                            </Button>
                            {!address.default && (
                                <Button
                                    type="link"
                                    onClick={() => handleSelectAddress(address._id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Select as Default
                                </Button>
                            )}

                            <Button
                                type="link"
                                onClick={() => showDeleteModal(address._id)}
                                icon={<DeleteOutlined />}
                                className="text-red-500 hover:text-red-700"
                                loading={deleteLoading}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                )) : <div className=' w-full flex justify-center items-center min-w-[20vh]'>
                    NO any address saved
                </div>)}
            </div>

            <div className="mt-6">
                <Button
                    type="primary"
                    onClick={handleAddAddress}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                >
                    Add New Address
                </Button>
            </div>

            {formState &&
                (
                    <AccAddressFormEl formState={formState} handleSaveAddress={handleSaveAddress} schemaErrors={schemaErrors} handleCancel={handleFormClose} setFormState={setFormState} loading={loading} />
                )
            }


            <Modal
                title="Delete Address"
                open={isModalVisible}
                onOk={handleDeleteAddress}
                onCancel={handleCancel}
                okText="Yes, delete"
                cancelText="No"
            >
                <p>Are you sure you want to delete this address?</p>
            </Modal>

        </div>
    );
};

export default AccAddressEl;
