// import { useParams, useNavigate } from "react-router-dom";
// import {
//     MailOutlined,
//     PhoneOutlined,
//     ShopOutlined,
//     ShopFilled,
//     HomeOutlined,
//     CompassFilled,
//     IdcardOutlined,
// } from "@ant-design/icons";

// const SpecificSellerEl = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const seller = {
//         name: "John Doe",
//         role: "seller",
//         email: "john.doe@example.com",
//         shopName: "Doe's Emporium",
//         shopAddress: "Vidya Nagar, Harmu Ranchi, Jharkhand",
//         shopPinCode: "834002",
//         shopContactNo: "+123456789",
//         aaddharNumb: "620711563452",
//         profilePicture: null, // or provide an image URL
//     };


//     return (
//         <>
//             <div className="container mx-auto  bg-white shadow-md rounded-lg border overflow-hidden">
//                 {/* Seller Header */}
//                 <div className="flex bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 text-white p-10 relative">
//                     <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md border-2 border-white">
//                         {seller.profilePicture ? (
//                             <img
//                                 src={seller.profilePicture}
//                                 alt={`${seller.name}'s profile`}
//                                 className="w-full h-full object-cover"
//                             />
//                         ) : (
//                             <ShopFilled className="text-6xl text-gray-300" />
//                         )}
//                     </div>

//                     <button
//                         onClick={() => navigate(-1)}
//                         className="absolute z-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200"
//                         style={{ top: "0.5rem", right: "1rem" }}
//                     >
//                         <span className="material-icons-outlined text-base"> &larr; </span>
//                         <span>Back</span>
//                     </button>

//                     <div className="ml-8">
//                         <h1 className="text-4xl font-bold">{seller.name} ({seller.role})</h1>
//                         <p className="text-lg mt-2">
//                             Seller ID: <span className="font-semibold">{id}</span>
//                         </p>
//                         <p className="text-lg mt-2">
//                             Aadhaar Number: <span className="font-semibold">{seller.aaddharNumb}</span>
//                         </p>
//                         <p className="text-xl mt-2 flex items-center gap-3">
//                             <ShopOutlined /> {seller.shopName || "N/A"}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Seller Details */}
//                 <div className="grid grid-cols-2 gap-8 p-10 bg-gray-50">
//                     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//                             Contact Information
//                         </h2>
//                         <div className="space-y-5">
//                             <div className="flex items-center gap-4">
//                                 <MailOutlined className="text-blue-500 text-2xl" />
//                                 <p className="text-lg text-gray-600">{seller.email || "N/A"}</p>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <PhoneOutlined className="text-green-500 text-2xl" />
//                                 <p className="text-lg text-gray-600">{seller.shopContactNo || "N/A"}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Shop Address */}
//                     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//                             Shop Address
//                         </h2>
//                         <div className="space-y-5">
//                             <div className="flex items-center gap-4">
//                                 <HomeOutlined className="text-blue-500 text-2xl" />
//                                 <p className="text-lg text-gray-600">{seller.shopAddress || "N/A"}</p>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <CompassFilled className="text-blue-500 text-2xl" />
//                                 <p className="text-lg text-gray-600">{seller.shopPinCode || "N/A"}</p>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             <div className="w-full mx-auto bg-white shadow-md px-6 py-4 rounded-md">

//                 <div className="flex items-center justify-between mb-6">
//                     <span className="text-xl font-semibold text-[#2d2f36]">Payment History</span>
//                 </div>

//                 <div className="w-full bg-white shadow-md rounded-lg">
//                     {/* Header Row */}
//                     <div className="flex text-gray-700 text-sm font-semibold border-b p-4 bg-gray-100 rounded-t-lg">
//                         <div className="flex-1 ">ID</div>
//                         <div className="flex-1 ">Shop name</div>
//                         <div className="flex-1 ">Product-Id</div>
//                         <div className="flex-1">Product-Name</div>
//                         <div className="flex-1">Amount</div>
//                         <div className="flex-1">Date</div>
//                         <div className="flex-1">Time</div>
//                     </div>

//                     {/* Data Rows */}
//                     <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
//                         <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
//                         <div className="flex-1 text-gray-600">{seller.shopName}</div>
//                         <div className="flex-1 text-gray-600">43278363</div>
//                         <div className="flex-1 text-gray-600">Hawan Material</div>
//                         <div className="flex-1 text-gray-600">$556</div>
//                         <div className="flex-1 text-gray-600">21/03/24</div>
//                         <div className="flex-1 text-gray-600">At 9:28 pm</div>
//                     </div>
//                     <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
//                         <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
//                         <div className="flex-1 text-gray-600">{seller.shopName}</div>
//                         <div className="flex-1 text-gray-600">43278363</div>
//                         <div className="flex-1 text-gray-600">Hawan Material</div>
//                         <div className="flex-1 text-gray-600">$556</div>
//                         <div className="flex-1 text-gray-600">21/03/24</div>
//                         <div className="flex-1 text-gray-600">At 9:28 pm</div>
//                     </div>
//                     <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
//                         <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
//                         <div className="flex-1 text-gray-600">{seller.shopName}</div>
//                         <div className="flex-1 text-gray-600">43278363</div>
//                         <div className="flex-1 text-gray-600">Hawan Material</div>
//                         <div className="flex-1 text-gray-600">$556</div>
//                         <div className="flex-1 text-gray-600">21/03/24</div>
//                         <div className="flex-1 text-gray-600">At 9:28 pm</div>
//                     </div>
//                     <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
//                         <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
//                         <div className="flex-1 text-gray-600">{seller.shopName}</div>
//                         <div className="flex-1 text-gray-600">43278363</div>
//                         <div className="flex-1 text-gray-600">Hawan Material</div>
//                         <div className="flex-1 text-gray-600">$556</div>
//                         <div className="flex-1 text-gray-600">21/03/24</div>
//                         <div className="flex-1 text-gray-600">At 9:28 pm</div>
//                     </div>
//                     <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
//                         <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
//                         <div className="flex-1 text-gray-600">{seller.shopName}</div>
//                         <div className="flex-1 text-gray-600">43278363</div>
//                         <div className="flex-1 text-gray-600">Hawan Material</div>
//                         <div className="flex-1 text-gray-600">$556</div>
//                         <div className="flex-1 text-gray-600">21/03/24</div>
//                         <div className="flex-1 text-gray-600">At 9:28 pm</div>
//                     </div>
//                 </div>

//                 <div className="text-center mt-4">
//                     <button className="px-4 py-2 rounded-md hover:bg-blue-500 bg-blue-400 text-white font-semibold">
//                         Load More
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SpecificSellerEl;



import { useParams, useNavigate } from "react-router-dom";
import {
    MailOutlined,
    PhoneOutlined,
    ShopOutlined,
    ShopFilled,
    HomeOutlined,
    CompassFilled,
    IdcardOutlined,
} from "@ant-design/icons";

const SpecificSellerEl = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const seller = {
        name: "John Doe",
        role: "seller",
        email: "john.doe@example.com",
        shopName: "Doe's Emporium",
        shopAddress: "Vidya Nagar, Harmu Ranchi, Jharkhand",
        shopPinCode: "834002",
        shopContactNo: "+123456789",
        aaddharNumb: "620711563452",
        profilePicture: null, // or provide an image URL
    };

    const handleDeleteAccount = () => {
        // Add functionality for deleting the account here
        if (window.confirm("Are you sure you want to delete this account?")) {
            console.log("Account deleted for seller ID:", id);
            // Add API call or state update logic here
            navigate("/"); // Redirect to another page after deletion
        }
    };

    return (
        <>
            <div className="container mx-auto bg-white shadow-md rounded-lg border overflow-hidden">
                {/* Seller Header */}
                <div className="flex bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 text-white p-10 relative">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md border-2 border-white">
                        {seller.profilePicture ? (
                            <img
                                src={seller.profilePicture}
                                alt={`${seller.name}'s profile`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <ShopFilled className="text-6xl text-gray-300" />
                        )}
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="absolute z-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200"
                        style={{ top: "0.5rem", right: "1rem" }}
                    >
                        <span className="material-icons-outlined text-base">&larr;</span>
                        <span>Back</span>
                    </button>

                    <div className="ml-8">
                        <h1 className="text-4xl font-bold">{seller.name} ({seller.role})</h1>
                        <p className="text-lg mt-2">
                            Seller ID: <span className="font-semibold">{id}</span>
                        </p>
                        <p className="text-lg mt-2">
                            Aadhaar Number: <span className="font-semibold">{seller.aaddharNumb}</span>
                        </p>
                        <p className="text-xl mt-2 flex items-center gap-3">
                            <ShopOutlined /> {seller.shopName || "N/A"}
                        </p>
                    </div>

                    <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all absolute bottom-2 right-2"
                    >
                        Delete Account
                    </button>

                </div>

                {/* Seller Details */}
                <div className="grid grid-cols-2 gap-8 p-10 bg-gray-50">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Contact Information
                        </h2>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <MailOutlined className="text-blue-500 text-2xl" />
                                <p className="text-lg text-gray-600">{seller.email || "N/A"}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <PhoneOutlined className="text-green-500 text-2xl" />
                                <p className="text-lg text-gray-600">{seller.shopContactNo || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shop Address */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Shop Address
                        </h2>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <HomeOutlined className="text-blue-500 text-2xl" />
                                <p className="text-lg text-gray-600">{seller.shopAddress || "N/A"}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <CompassFilled className="text-blue-500 text-2xl" />
                                <p className="text-lg text-gray-600">{seller.shopPinCode || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="w-full mx-auto bg-white shadow-md px-6 py-4 rounded-md">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold text-[#2d2f36]">Payment History</span>
                </div>

                <div className="w-full bg-white shadow-md rounded-lg">
                    {/* Header Row */}
                    <div className="flex text-gray-700 text-sm font-semibold border-b p-4 bg-gray-100 rounded-t-lg">
                        <div className="flex-1 ">ID</div>
                        <div className="flex-1 ">Shop name</div>
                        <div className="flex-1 ">Product-Id</div>
                        <div className="flex-1">Product-Name</div>
                        <div className="flex-1">Amount</div>
                        <div className="flex-1">Date</div>
                        <div className="flex-1">Time</div>
                    </div>

                    {/* Data Rows */}
                    <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
                        <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
                        <div className="flex-1 text-gray-600">{seller.shopName}</div>
                        <div className="flex-1 text-gray-600">43278363</div>
                        <div className="flex-1 text-gray-600">Hawan Material</div>
                        <div className="flex-1 text-gray-600">$556</div>
                        <div className="flex-1 text-gray-600">21/03/24</div>
                        <div className="flex-1 text-gray-600">At 9:28 pm</div>
                    </div>
                    <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
                        <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
                        <div className="flex-1 text-gray-600">{seller.shopName}</div>
                        <div className="flex-1 text-gray-600">43278363</div>
                        <div className="flex-1 text-gray-600">Hawan Material</div>
                        <div className="flex-1 text-gray-600">$556</div>
                        <div className="flex-1 text-gray-600">21/03/24</div>
                        <div className="flex-1 text-gray-600">At 9:28 pm</div>
                    </div>
                    <div className="flex text-gray-500 text-sm border-b p-4 bg-white ">
                        <div className="flex-1 text-gray-600">#6e2esw743h8hf</div>
                        <div className="flex-1 text-gray-600">{seller.shopName}</div>
                        <div className="flex-1 text-gray-600">43278363</div>
                        <div className="flex-1 text-gray-600">Hawan Material</div>
                        <div className="flex-1 text-gray-600">$556</div>
                        <div className="flex-1 text-gray-600">21/03/24</div>
                        <div className="flex-1 text-gray-600">At 9:28 pm</div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button className="px-4 py-2 rounded-md hover:bg-blue-500 bg-blue-400 text-white font-semibold">
                        Load More
                    </button>
                </div>
            </div>
        </>
    );
};

export default SpecificSellerEl;