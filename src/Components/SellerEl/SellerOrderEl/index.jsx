import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const SellerOrderEl = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    // Demo data for the table
    const orders = [
        { id: 243423, name: "Aditya Dalla", email: "dalla@gmail.com", phone: "dalla456667", address: "Dallapur", status: "Not Delivered" },
        { id: 543231, name: "Rahul Kumar", email: "rahul@gmail.com", phone: "rahul234567", address: "Rahulpur", status: "Delivered" },
        { id: 345678, name: "Sneha Sharma", email: "sneha@gmail.com", phone: "sneha999", address: "Sharmapur", status: "Not Delivered" },
        { id: 123456, name: "Aryan Singh", email: "aryan@gmail.com", phone: "aryan333", address: "Aryanpur", status: "Delivered" },
        { id: 987654, name: "Raj CEO of Webitya.com", email: "priya@gmail.com", phone: "priya222", address: "Verma Nagar", status: "Delivered" },
        { id: 567890, name: "Rohan Gupta", email: "rohan@gmail.com", phone: "rohan444", address: "Guptapur", status: "Not Delivered" },
    ];

    // Filter rows based on search query
    const filteredOrders = orders.filter(
        (order) =>
            order.id.toString().includes(searchQuery) ||
            order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.phone.includes(searchQuery)
    );

    // Calculate pagination values
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        } else if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className="flex-1 bg-[#f2f2f2] p-6">
            <h1 className="text-2xl font-bold text-[#2d2f36] mb-6">Orders</h1>

            {/* Search Input */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search by ID, Name, Phone Number & Email."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-none outline-none pl-10 pr-6 py-1.5 rounded-md w-full shadow-md"
                />
                <SearchOutlined className="absolute top-1/2 -translate-y-1/2 left-[1%] text-lg" />
            </div>

            {/* Table */}
            <div className="bg-white shadow-md px-4 py-4 rounded-md">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-[#2d2f36]">Summary</h2>
                    <div className="flex gap-2">
                        <span className="text-gray-500 text-sm font-semibold">Rows per page:</span>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                            className="border border-gray-600 outline-none text-center px-2 text-sm text-black rounded-md w-10 shadow-md"
                        />
                    </div>
                </div>
                <table className="border-b w-full text-center text-sm">
                    <thead>
                        <tr className="text-gray-500">
                            <th className="py-2 border-b">ID</th>
                            <th className="py-2 border-b">Name</th>
                            <th className="py-2 border-b">Email</th>
                            <th className="py-2 border-b">Phone</th>
                            <th className="py-2 border-b">Address</th>
                            <th className="py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order) => (
                            <tr className="border-b" key={order.id}>
                                <td className="py-3">{order.id}</td>
                                <td className="py-3">{order.name}</td>
                                <td className="py-3">{order.email}</td>
                                <td className="py-3">{order.phone}</td>
                                <td className="py-3">{order.address}</td>
                                <td className="py-3">
                                    <span className={`px-1 py-1 rounded-sm ${order.status === "Delivered" ? "bg-green-600" : "bg-red-600"} text-white`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange("prev")}
                        className="px-4 py-2 bg-gray-200 rounded-md text-sm"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange("next")}
                        className="px-4 py-2 bg-gray-200 rounded-md text-sm"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerOrderEl;
