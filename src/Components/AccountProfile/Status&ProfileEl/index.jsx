import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import toast from "react-hot-toast";
import { useRequestApi } from "../../../hooks/useRequestApi";

const StatusAndProfileEl = ({ state }) => {
    const [panditData, setPanditData] = useState(null);
    const [status, setStatus] = useState("not applied");
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    useEffect(() => {
        const fetchPanditData = async () => {
            try {
                const response = await useRequestApi('api/role/getMyRequestStatus?requestType=pandit');
                setPanditData(response.data);
                setStatus("pending");

            } catch (error) {
                // console.error("Error fetching pandit data:", error);
                // toast.error("Failed to fetch request data.");
            }
        };

        fetchPanditData();
    }, [state]);

    const confirmCancel = async () => {
        try {
            setCancelLoading(true);
            const response = await useRequestApi('api/role/cenceleRequestStatus?requestType=pandit', 'POST');
            setStatus("not applied");
            setPanditData(null);
            toast.success("Your registration has been cancelled.");
            setShowCancelModal(false);
        } catch (error) {
            console.error("Error cancelling registration:", error);
            toast.error("An error occurred while cancelling the registration.");
            setShowCancelModal(false);
        } finally {
            setCancelLoading(false);
        }
    };

    return (
        <>
            {
                panditData && (
                    <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg flex gap-4 items-center">
                        {/* Profile Picture */}
                        <img
                            src={panditData?.imageUrl || "https://via.placeholder.com/80"}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />

                        {/* Info Section */}
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-800">{panditData?.name || "Pandit Name"}</h3>
                            <p className="text-sm text-gray-600">
                                Registration Status:{" "}
                                <span
                                    className={`font-semibold ${status === "pending" ? "text-yellow-700" : "text-gray-500"}`}
                                >
                                    {status === "pending" ? "Pending" : "Not Applied"}
                                </span>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2">
                            <Button
                                type="primary"
                                ghost
                                size="small"
                                onClick={() => setShowDetailsModal(true)}
                                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                                View Details
                            </Button>
                            <Button
                                type="danger"
                                size="small"
                                disabled={status !== "pending"}
                                onClick={() => setShowCancelModal(true)}
                                className="hover:bg-red-400 bg-red-500"
                            >
                                Cancel Registration
                            </Button>
                        </div>

                        {/* Modal: View Details */}
                        <Modal
                            title="Pandit Details"
                            open={showDetailsModal}
                            onCancel={() => setShowDetailsModal(false)}
                            footer={null}
                        >
                            {panditData ? (
                                <div className="text-sm space-y-4">
                                    {/* Profile Picture Section */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={panditData?.imageUrl || "https://via.placeholder.com/150"}
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full border border-gray-300"
                                        />
                                        <div>
                                            <p className="text-base font-medium text-gray-700">Profile Picture</p>
                                            <p className="text-gray-500 text-sm">Uploaded image of the user</p>
                                        </div>
                                    </div>

                                    {/* Other Details */}
                                    <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4">
                                        <p><strong>Expertise:</strong> {panditData.expertise || "N/A"}</p>
                                        <p><strong>Experience:</strong> {panditData.experience ? `${panditData.experience} years` : "N/A"}</p>
                                        <p><strong>Contact:</strong> {panditData.contact || "N/A"}</p>
                                        <p><strong>Age:</strong> {panditData.age || "N/A"}</p>
                                        <p><strong>Aadhar No:</strong> {panditData.aadharNo || "N/A"}</p>
                                    </div>
                                </div>

                            ) : (
                                <p>No details available.</p>
                            )}
                        </Modal>

                        {/* Modal: Cancel Confirmation */}
                        <Modal
                            title="Cancel Registration"
                            visible={showCancelModal}
                            onOk={confirmCancel}
                            onCancel={() => setShowCancelModal(false)}
                            okText="Yes, Cancel"
                            cancelText="No, Keep Registration"
                            confirmLoading={cancelLoading}
                        >
                            <p>Are you sure you want to cancel your registration?</p>
                        </Modal>
                    </div>
                )
            }
        </>

    );
};

export default StatusAndProfileEl;
