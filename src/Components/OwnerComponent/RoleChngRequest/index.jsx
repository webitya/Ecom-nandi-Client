import { DownCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRequestApi } from "../../../hooks/useRequestApi";
import toast from "react-hot-toast";
import { useData } from "../../../hooks/useData";
import { setList } from "../../../redux/features/ownerRedux/roleChangeSlice/roleChangeSlice";
import { updateParticularValue } from "../../../redux/features/ownerRedux/dashboardSlice/dashboardSlice";
import { Spin } from "antd";

const RoleChngRequest = () => {
    const navigate = useNavigate()
    const roleChangeList = useSelector(state => state.role_change.roleChangeList)
    const dashboardValue = useSelector(state => state.dashboard_value.value)
    const { getData, dispatchActionObject } = useData()
    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [curntPage, setCurntPage] = useState(1);
    const [isDropped, setIsDropped] = useState({})
    const [loader, setLoader] = useState({
        acceptLoader: false,
        rejectloader: false
    })

    const handleSearchQuery = (e) => {
        const { value } = e.target
        setSearchQuery(value);
    }

    const handleRowChange = (e) => {
        const { value } = e.target
        setRowsPerPage(Number(value))
    }

    const filteredUsers = roleChangeList.filter(
        (user) => user.userId.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            || user.userId.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            || user.userId.email.includes(searchQuery)
            || user.appliedRole.includes(searchQuery.toLowerCase())
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

    const handleAcceptClick = async (id, Appliedrole) => {

        setLoader((prev) => ({ ...prev, acceptLoader: true }))
        const endpoint = (Appliedrole === 'pandit')
            ? `api/role/approvedPanditRequest?userId=${id}`
            : `api/role/approvedSellerRequest?userId=${id}`

        const keyName = (Appliedrole === 'pandit') ? 'totalpandit' : 'totalseller'
        const keyValue = (Appliedrole === 'pandit') ? dashboardValue.totalpandit : dashboardValue.totalseller

        try {

            await useRequestApi(endpoint, 'PATCH')
            const [pendingSellerRequests, pendingPanditRequest] = await Promise.all([
                getData('api/role/getPendingSellerRequest'),
                getData('api/role/getPendingPanditRequest'),
            ]);

            dispatch(setList([...pendingPanditRequest.data, ...pendingSellerRequests.data]))
            dispatchActionObject(updateParticularValue, {
                name: 'totalPendingRequest',
                value: (pendingPanditRequest.data.length + pendingSellerRequests.length)
            })
            dispatchActionObject(updateParticularValue, {
                name: keyName,
                value: keyValue + 1
            })

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Server error. Please try again later.")
        } finally {
            setLoader((prev) => ({ ...prev, acceptLoader: false }))
        }

    }

    const handleRejectClick = async (id, Appliedrole) => {

        setLoader((prev) => ({ ...prev, rejectloader: true }))

        const endpoint = (Appliedrole === 'pandit')
            ? `api/role/rejectPanditRequest?userId=${id}`
            : `api/role/rejectSellerRequest?userId=${id}`

        try {

            await useRequestApi(endpoint, 'PATCH')
            const [pendingSellerRequests, pendingPanditRequest] = await Promise.all([
                getData('api/role/getPendingSellerRequest'),
                getData('api/role/getPendingPanditRequest'),
            ]);

            dispatch(setList([...pendingPanditRequest.data, ...pendingSellerRequests.data]))

            dispatchActionObject(updateParticularValue, {
                name: 'totalPendingRequest',
                value: (pendingPanditRequest.data.length + pendingSellerRequests.length === 0) ?
                    0 : pendingPanditRequest.data.length + pendingSellerRequests.length
            })

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Server error. Please try again later.")
        } finally {
            setLoader((prev) => ({ ...prev, rejectloader: false }))
        }

    }

    const handleDropdownToggle = (id) => {
        setIsDropped((prev) => {
            return {
                ...prev,
                [id]: !prev[id]

            };
        })
    }
    return (

        <>
            {
                !roleChangeList.length ?

                    <div className="h-full w-full flex justify-center items-center container">
                        <p className="text-2xl font-semibold text-gray-700">
                            No Role Change Request are Pending
                        </p>
                    </div>
                    :
                    <div className="p-6 bg-[#f2f2f2] container mx-auto">
                        <h1 className="text-3xl font-bold text-[#2d2f36] mb-6 text-center">Requests for Role Change</h1>

                        {/* Search Input */}
                        <div className="relative mb-6 mx-auto">
                            <input
                                type="text"
                                placeholder="Search by Name, Email & Applied Role."
                                name="listSearch"
                                value={searchQuery}
                                onChange={handleSearchQuery}
                                className="border-none outline-none pl-10 pr-6 py-1.5 rounded-md w-full shadow-md"
                            />
                            <SearchOutlined className="absolute top-1/2 -translate-y-1/2 left-[1%] text-lg" />
                        </div>

                        <div className=" mx-auto bg-white shadow-md px-6 py-4 rounded-md">

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
                                    <div className="flex-[2] ">Name</div>
                                    <div className="flex-[2] ">Phone No.</div>
                                    <div className="flex-[2] ">Email</div>
                                    <div className="flex-1 ">Role</div>
                                    <div className="flex-1 ">Aadhar No.</div>
                                    <div className="flex-1 ">Status</div>
                                </div>

                                {/* Data Rows */}
                                <div>
                                    {paginatedUsers.map((user, index) => {

                                        return (
                                            <div
                                                key={index}
                                                className={`flex py-4 px-4 items-center text-sm
                                    ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} `}
                                            >
                                                <div className="flex-[2] text-gray-800 font-medium">
                                                    {user.userId.firstName + " " + user.userId.lastName}
                                                </div>
                                                <div className="flex-[2] text-gray-600 ">
                                                    {user.contact || user.shop_contact}
                                                </div>
                                                <div className="flex-[2] text-gray-600 ">
                                                    {user.userId.email}
                                                </div>
                                                <div className="flex-1 text-gray-700 capitalize ">
                                                    <span className={`px-2 py-1 text-xs rounded-full bg-blue-100 
                                        text-blue-700`}>
                                                        {user.appliedRole}
                                                    </span>
                                                </div>
                                                <div className="flex-1 text-gray-500">{user.aadharNo || user.AadhaarNum}</div>
                                                <div className="flex-1 text-gray-500 relative">
                                                    <button
                                                        className="flex gap-1 items-center rounded-md border border-gray-500 w-fit px-2 py-1 hover:text-blue-500 hover:border-blue-500"
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
                                                        <ul className={`p-1 rounded-md bg-white shadow-md absolute z-20 top-full } transition-all 
                                                ${isDropped[user._id] ? 'opacity-100 translate-y-0 pointer-events-auto' :
                                                                'opacity-0 -translate-y-2 pointer-events-none'
                                                            } `} >
                                                            <li
                                                                onClick={() => {
                                                                    handleAcceptClick(user.userId._id, user.appliedRole, user._id);
                                                                }}
                                                                className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-200 pl-2 pr-6 py-2 rounded-md"
                                                            >
                                                                {
                                                                    loader.acceptLoader ?
                                                                        <Spin size="small" />
                                                                        :
                                                                        <>
                                                                            <div className="bg-green-400 w-1.5 h-1.5 rounded-full"></div>
                                                                            <span className={`text-xs capitalize tracking-widest`}>Accept</span>
                                                                        </>
                                                                }

                                                            </li>
                                                            <li
                                                                onClick={() => {
                                                                    handleRejectClick(user.userId._id, user.appliedRole, user._id);
                                                                }}
                                                                className="flex gap-2 items-center mb-2 cursor-pointer hover:bg-gray-200 pl-2 pr-6 py-2 rounded-md"
                                                            >
                                                                {
                                                                    loader.rejectloader ?
                                                                        <Spin size="small" />
                                                                        :
                                                                        <>
                                                                            <div className="bg-red-400 w-1.5 h-1.5 rounded-full"></div>
                                                                            <span className={`text-xs capitalize tracking-widest`}>Reject</span>
                                                                        </>
                                                                }

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
            }
        </>
    );
};

export default RoleChngRequest;