import { DownCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PanditBooking = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [curntPage, setCurntPage] = useState(1);

    const [curntBooking, setCurntBooking] = useState(null)

    const bookings = [
        {
            _id: "348795893546",
            name: "Aniket Chaturvedi",
            email: "aniketchaturvedi309@gmail.com",
            contact: "6787654352",
            amount: '$345',
            pin_code: '834002',
            address: 'Ganga nagar harmu ranchi',
            state: 'jharkhand'
        },
        {
            _id: "0996584512",
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            contact: "6787654352",
            amount: '$657',
            pin_code: '834001',
            address: 'vidya nagar ranchi',
            state: 'Lucknow'
        },
        {
            _id: "1039805625",
            name: "Priya Singh",
            email: "priya.singh@example.com",
            contact: "6787654352",
            amount: '$413',
            pin_code: '834003',
            address: 'Moti sahu gali Madhukam ranchi',
            state: 'Hrayana'
        },
    ];

    const handleSearchQuery = (e) => {
        const { value } = e.target
        setSearchQuery(value);
    }

    const handleRowChange = (e) => {
        const { value } = e.target
        setRowsPerPage(Number(value))
    }

    const filteredBookings = bookings.filter(
        (employe) => employe.name.toLowerCase().includes(searchQuery.toLowerCase())
            || employe.email.includes(searchQuery.toLowerCase()) || employe.contact.includes(searchQuery)
            || employe.amount.includes(searchQuery)
    )

    const totalPage = Math.ceil(filteredBookings.length / rowsPerPage)
    const paginateBookings = filteredBookings.slice(
        (curntPage - 1) * rowsPerPage, curntPage * rowsPerPage
    )

    const handleBtnClick = (whichBtn) => {
        if (whichBtn === 'next') {
            setCurntPage((prev) => prev + 1)
        } else if (whichBtn === 'prev') {
            setCurntPage((prev) => prev - 1)
        }
    }

    const showLoading = (index) => {
        setOpen(true);
        setLoading(true);
        console.log(index)
        setCurntBooking(index)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }



    return (
        <>
            {
                !bookings.length
                    ?
                    <div className="flex justify-center items-center container relative">
                        <p className="text-2xl font-semibold text-center text-gray-700">
                            No booking is found
                        </p>
                    </div>
                    :
                    <div className="p-6 bg-[#f2f2f2] container">
                        <h1 className="text-3xl font-bold text-[#2d2f36] text-center mb-6">Pandit Bookings Requests</h1>
                        {/* Search Input */}
                        <div className="relative mb-6 w-[90%] mx-auto">
                            <input
                                type="text"
                                placeholder="Search by ID, Name, Phone Number & Email."
                                name="listSearch"
                                value={searchQuery}
                                onChange={handleSearchQuery}
                                className="border-none outline-none pl-10 pr-6 py-1.5 rounded-md w-full shadow-md"
                            />
                            <SearchOutlined className="absolute top-1/2 -translate-y-1/2 left-[1%] text-lg" />
                        </div>

                        <div className="w-full mx-auto bg-white shadow-md px-6 py-4 rounded-md">

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xl font-semibold text-[#2d2f36]">Pendings</span>
                                <div className="flex gap-2">
                                    <span className="text-gray-500 text-sm font-semibold">Rows per page:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={rowsPerPage}
                                        onChange={handleRowChange}
                                        className="border border-gray-600 outline-none text-center px-2 text-sm text-black rounded-md w-10 shadow-md"
                                    />
                                </div>
                            </div>

                            <div className="w-full bg-white shadow-md rounded-lg">
                                {/* Header Row */}
                                <div className="flex text-gray-700 text-sm font-semibold border-b p-4 bg-gray-100 rounded-t-lg">
                                    <div className="flex-[2]">Name</div>
                                    <div className="flex-[2]">Email</div>
                                    <div className="flex-1">Phone No.</div>
                                    <div className="flex-1">Amount</div>
                                    <div className="flex-1">Pin code</div>
                                    <div className="flex-1">Status</div>
                                </div>

                                {/* Data Rows */}
                                <div>
                                    {paginateBookings.map((booking, index) => {

                                        return (
                                            <div
                                                key={index}
                                                className={`flex py-4 px-4 items-center text-sm
                                    ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} `}
                                            >
                                                <div className="flex-[2] text-gray-800 font-medium">{booking.name}</div>
                                                <div className="flex-[2] text-gray-600 ">{booking.email}</div>
                                                <div className="flex-1 text-gray-600 ">{booking.contact}</div>
                                                <div className="flex-1 text-gray-500">{booking.amount}</div>
                                                <div className="flex-1 text-gray-500">{booking.pin_code}</div>
                                                <div className="flex-1 text-gray-800">
                                                    <button
                                                        className="flex gap-1 items-center rounded-md border bg-blue-400 hover:bg-blue-600 shadow-xl w-fit px-2 py-1"
                                                        onClick={() => { showLoading(index) }}
                                                    >
                                                        <span className={`text-xs capitalize tracking-widest`}>
                                                            Details
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>

                            {
                                paginateBookings.length === 0 &&
                                <div className="text-2xl font-semibold text-center "> Data Not found </div>
                            }

                            <div className="mt-4 flex items-center justify-between">

                                <button
                                    className={`px-4 py-2 bg-gray-200 rounded-md text-sm
                        ${curntPage === 1 ? 'opacity-50' : 'opacity-100'}`}
                                    onClick={() => { handleBtnClick("prev") }}
                                    disabled={curntPage === 1 && true}
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {curntPage} of {totalPage}
                                </span>

                                <button
                                    className={`px-4 py-2 bg-gray-200 rounded-md text-sm 
                        ${curntPage === totalPage ? 'opacity-50' : 'opacity-100'}`}
                                    onClick={() => { handleBtnClick("next") }}
                                    disabled={curntPage === totalPage && true}
                                >
                                    Next
                                </button>

                            </div>
                        </div>

                        <Modal
                            title={<p className="mb-4">Booking Details</p>}
                            footer={
                                <>
                                    <Button type="primary" onClick={showLoading}>
                                        Accept
                                    </Button>

                                    <Button danger onClick={showLoading}>
                                        Reject
                                    </Button>
                                </>
                            }
                            loading={loading}
                            open={open}
                            onCancel={() => setOpen(false)}
                        >
                            <div className="space-y-4">
                                <p className="flex gap-4">
                                    <span className="font-bold w-24">Name:</span>
                                    <span>{curntBooking !== null && bookings[curntBooking].name}</span>
                                </p>

                                <p className="flex gap-4">
                                    <span className="font-bold w-24">Contact:</span>
                                    <span>{curntBooking !== null && bookings[curntBooking].contact}</span>
                                </p>

                                <p className="flex gap-4">
                                    <span className="font-bold w-24">Email:</span>
                                    <span>{curntBooking !== null && bookings[curntBooking].email}</span>
                                </p>

                                <p className="flex gap-4">
                                    <span className="font-bold w-24">Address:</span>
                                    <span>{curntBooking !== null && bookings[curntBooking].address}</span>
                                </p>

                                <p className="flex gap-4">
                                    <span className="font-bold w-24">Pin Code:</span>
                                    <span>{curntBooking !== null && bookings[curntBooking].pin_code}</span>
                                </p>

                                <p className="flex gap-4">
                                    <span className="font-bold w-24">State:</span>
                                    <span>{curntBooking !== null && bookings[curntBooking].state}</span>
                                </p>

                            </div>

                        </Modal>
                    </div>
            }
        </>
    );
}

export default PanditBooking;