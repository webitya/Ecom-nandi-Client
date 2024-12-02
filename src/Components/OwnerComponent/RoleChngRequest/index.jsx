import { DownCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleChngRequest = () => {
    const navigate = useNavigate();

    const users=[
        {
            _id: "673dbe15f3a20771b874fc61",
            name: "Aniket Chaturvedi",
            email: "aniketchaturvedi309@gmail.com",
            role: "pandit",
            isVerified: false,
            createdAt: "20/11/2024"
        },
        {
            _id: "673dbe15f3a20771b874fc62",
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            role: "seller",
            isVerified: true,
            createdAt: "25/11/2024"
        },
        {
            _id: "673dbe15f3a20771b874fc63",
            name: "Priya Singh",
            email: "priya.singh@example.com",
            role: "pandit",
            isVerified: false,
            createdAt: "13/11/2024"
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [curntPage, setCurntPage] = useState(1);
    const [isDropped, setIsDropped] = useState({})

    const handleSearchQuery = (e) => {
        const { value } = e.target
        setSearchQuery(value);
    }

    const handleRowChange = (e) => {
        const { value } = e.target
        setRowsPerPage(Number(value))
    }

    const filteredUsers = users.filter(
        (user) => user._id.includes(searchQuery) || user.name.toLowerCase().includes(searchQuery.toLowerCase())
            || user.email.includes(searchQuery.toLowerCase()) || user.phone.includes(searchQuery.toLowerCase())
            || user.createdAt.includes(searchQuery)
    )

    const totalPage = Math.ceil(filteredUsers.length / rowsPerPage)
    const paginatedUsers = filteredUsers.slice(
        (curntPage - 1) * rowsPerPage, curntPage * rowsPerPage
    )

    const handleBtnClick = (whichBtn) => {
        if (whichBtn === 'next') {
            setCurntPage((prev) => prev + 1)
        } else if (whichBtn === 'prev') {
            setCurntPage((prev) => prev - 1)
        }
    }

    // const detailBtnClick = (e) => {
    //     const { id } = e.target
    //     navigate(`/owner/pandits/${id}`)
    // }
    const handleDropdownToggle = (id) => {
        console.log(id)
        setIsDropped((prev) => {
            console.log(prev[id])
            return{
                ...prev,
                [id]: !prev[id]

            };
        })
    }
    return (

        <div className="p-6 bg-[#f2f2f2] container mx-auto">
            <h1 className="text-3xl font-bold text-[#2d2f36] mb-6">Requests for Role Change</h1>

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
                    <span className="text-xl font-semibold text-[#2d2f36]">List</span>
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
                        <div className="flex-[2] ">ID</div>
                        <div className="flex-[2] ">Name</div>
                        <div className="flex-[2] ">Email</div>
                        <div className="flex-1 ">Role</div>
                        <div className="flex-1 ">Requested At</div>
                        <div className="flex-1 ">Status</div>
                    </div>

                    {/* Data Rows */}
                    <div>
                        {paginatedUsers.map((user, index) => {

                            return(
                            <div
                                key={index}
                                className={`flex py-4 px-4 items-center text-sm
                                    ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} `}
                            >
                                <div className="flex-[2] text-gray-600 ">{user._id}</div>
                                <div className="flex-[2] text-gray-800 font-medium">{user.name}</div>
                                <div className="flex-[2] text-gray-600 ">{user.email}</div>
                                <div className="flex-1 text-gray-700 capitalize ">
                                    <span className={`px-2 py-1 text-xs rounded-full bg-blue-100 
                                        text-blue-700`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div className="flex-1 text-gray-500">{user.createdAt}</div>
                                <div className="flex-1 text-gray-500 relative">
                                    <button 
                                        className="flex gap-1 items-center rounded-md border border-gray-500 w-fit px-2 py-1"
                                        onClick={() => { handleDropdownToggle(user._id) }}
                                    >
                                        <div className="bg-yellow-400 w-1.5 h-1.5 rounded-full"></div>
                                        <span className={`text-xs capitalize tracking-widest`}>
                                            pending
                                        </span>
                                        <DownCircleFilled />
                                    </button>
                                    {
                                         isDropped[user._id]  //
                                         && 
                                        <ul className={`p-1 rounded-md bg-white shadow-md absolute z-20 top-full } transition-opacity ${isDropped ? 'opacity-100': 'opacity-0'} `} >
                                            <li className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-200 pl-2 pr-6 py-2 rounded-md">
                                                <div className="bg-yellow-400 w-1.5 h-1.5 rounded-full"></div>
                                                <span className={`text-xs capitalize tracking-widest`}>pending</span>
                                            </li>
                                            <li className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-200 pl-2 pr-6 py-2 rounded-md">
                                                <div className="bg-green-400 w-1.5 h-1.5 rounded-full"></div>
                                                <span className={`text-xs capitalize tracking-widest`}>Accept</span>
                                            </li>
                                            <li className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-200 pl-2 pr-6 py-2 rounded-md">
                                                <div className="bg-red-400 w-1.5 h-1.5 rounded-full"></div>
                                                <span className={`text-xs capitalize tracking-widest`}>Reject</span>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            </div>
                            )
                        }
                    )}
                    </div>
                </div>


                {
                    paginatedUsers.length === 0 &&
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
        </div>
    );
};

export default RoleChngRequest;