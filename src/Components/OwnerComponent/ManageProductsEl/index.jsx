import { DeleteOutlined, DownCircleFilled, EditOutlined, EyeFilled, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageProductsEl = () => {
    const navigate = useNavigate();
    const Products = [
        {
            Sl: '1',
            Product_id: "673dbe15f3a20771b874fc61",
            Product_name: "Hawan Samagri",
            category: "Puja",
            price: "$745",
            discount_price: "$630"
        },
        {
            Sl: '2',
            Product_id: "673dbe15f3a20771b874fc62",
            Product_name: "Incense Sticks",
            category: "Puja",
            price: "$112",
            discount_price: "$85"
        },
        {
            Sl: '3',
            Product_id: "673dbe15f3a20771b874fc63",
            Product_name: "Photo Frame",
            category: "Decoration",
            price: "$345",
            discount_price: "$289"
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQuery = (e) => {
        const { value } = e.target
        setSearchQuery(value);
    }

    const filteredProducts = Products.filter(
        (product) => product.Sl.includes(searchQuery)
            || product.Product_name.toLowerCase().includes(searchQuery.toLowerCase())
            || product.category.toLowerCase().includes(searchQuery.toLowerCase())
            || product.price.includes(searchQuery)
    )

    const restOfTheProducts = Products.filter(
        (product) => {
            return !(filteredProducts.some(filtered => filtered.Product_id === product.Product_id))
        }
    );

    const productForMaping = [
        ...filteredProducts, ...restOfTheProducts
    ]

    return (
        <div className="p-6 bg-[#f2f2f2] container mx-auto">
            <h1 className="text-3xl text-center font-bold text-[#2d2f36] mb-6">Manage Products</h1>

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

            <div className="w-full mx-auto bg-white shadow-md px-6 py-4 rounded-md min-w-[650px] overflow-x-auto">

                <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold text-[#2d2f36]">List</span>
                </div>

                {/* Table for data */}
                <div className="w-full shadow-md rounded-lg bg-blue-500 overflow-hidden">
                    {/* Header Row */}
                    <div className="flex justify-start text-gray-700 text-sm font-semibold border-b bg-gray-100">
                        <div className="flex-1 px-4 py-2">SL</div>
                        <div className="flex-[2] px-4 py-2">Product Name</div>
                        <div className="flex-[2] px-4 py-2">Category</div>
                        <div className="flex-1 px-4 py-2">Unit Price</div>
                        <div className="flex-1 px-4 py-2">Discount</div>
                        <div className="flex-[2] px-4 py-2">Actions</div>
                    </div>

                    {/* Data Rows */}
                    <div>
                        {productForMaping.map((product, index) => (
                            <div
                                key={product.Product_id}
                                className={`flex text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                            >
                                <div className="flex-1 px-4 py-2 text-gray-600">{product.Sl}</div>
                                <div className="flex-[2] px-4 py-2 text-gray-800 font-medium">{product.Product_name}</div>
                                <div className="flex-[2] px-4 py-2 text-gray-600">{product.category}</div>
                                <div className="flex-1 px-4 py-2 text-gray-500">{product.price}</div>
                                <div className="flex-1 px-4 py-2 text-gray-500">{product.discount_price}</div>
                                <div className="flex-[2] px-4 py-2 text-gray-500 flex items-center gap-2">
                                    <span
                                        id={product.Product_id}
                                        className="px-2 py-1 transition-all duration-300 border border-blue-500 text-blue-700 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                                    >
                                        <EyeOutlined />
                                    </span>

                                    <span
                                        id={product.Product_id}
                                        className="px-2 py-1 border border-blue-500 text-blue-700 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
                                    >
                                        <EditOutlined />
                                    </span>

                                    <span
                                        id={product.Product_id}
                                        className="px-2 py-1 border border-red-500 text-red-700 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                                    >
                                        <DeleteOutlined />
                                    </span>
            
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button className="px-4 py-2 rounded-md hover:bg-blue-500 bg-blue-400 text-white font-semibold">
                        Load More
                    </button>
                </div>

            </div>
        </div>

    )
}

export default ManageProductsEl
