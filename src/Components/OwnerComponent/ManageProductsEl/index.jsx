import { DownCircleFilled, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageProductsEl = () => {
    const navigate= useNavigate();
    const Products = [
        {
            Product_id: "673dbe15f3a20771b874fc61",
            Product_name: "Hawan Samagri",
            stocks: '56',
            price: "$745",
            discount_price: "$630"
        },
        {
            Product_id: "673dbe15f3a20771b874fc62",
            Product_name: "Incense Sticks",
            stocks: '23',
            price: "$112",
            discount_price: "$85"
        },
        {
            Product_id: "673dbe15f3a20771b874fc63",
            Product_name: "Photo Frame",
            stocks: '43',
            price: "$345",
            discount_price: "$289"
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQuery = (e) => {
        const { value } = e.target
        setSearchQuery(value);
    }

    console.log("match stick")
    const filteredProducts = Products.filter(
        (product) => product.Product_id.includes(searchQuery)
            || product.Product_name.toLowerCase().includes(searchQuery.toLowerCase())
            || product.stocks.includes(searchQuery)
            || product.price.includes(searchQuery)
    )

    const restOfTheProducts = Products.filter(
        (product) => {
            return !(filteredProducts.some(filtered => filtered.Product_id === product.Product_id))
        }
    );

    console.log(restOfTheProducts)

    const productForMaping = [
        ...filteredProducts, ...restOfTheProducts
    ]
    console.log(productForMaping);

    return (
        <div className="p-6 bg-[#f2f2f2] container mx-auto">
              <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md shadow hover:bg-gray-200 transition-colors duration-200"
          >
            ← Back
          </button>
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

            <div className="w-full mx-auto bg-white shadow-md px-6 py-4 rounded-md min-w-[650px] overflow-x-auto" >

                <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-semibold text-[#2d2f36]">List</span>
                </div>

                {/* Table for data */}
                <div className="w-full shadow-md rounded-lg bg-blue-500 overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-6 gap-2 text-gray-700 text-sm font-semibold border-b bg-gray-100">
                        <div className="px-4 py-2">Product Id</div>
                        <div className="px-4 py-2">Product Name</div>
                        <div className="px-4 py-2">Stocks</div>
                        <div className="px-4 py-2">Price</div>
                        <div className="px-4 py-2">Discount</div>
                        <div className="px-4 py-2">Action</div>
                    </div>

                    {/* Data Rows */}
                    <div>
                        {productForMaping.map((product, index) => (
                            <div
                                key={product.Product_id}
                                className={`grid grid-cols-6 gap-2 items-center text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                            >
                                <div className="px-4 py-2 text-gray-600">{product.Product_id}</div>
                                <div className="px-4 py-2 text-gray-800 font-medium">{product.Product_name}</div>
                                <div className="px-4 py-2 text-gray-600">{product.stocks}</div>
                                <div className="px-4 py-2 text-gray-500">{product.price}</div>
                                <div className="px-4 py-2 text-gray-500">{product.discount_price}</div>
                                <div className="px-4 py-2 text-gray-500 flex items-center gap-2">
                                    <span
                                        id={product.Product_id}
                                        className="px-4 py-1.5 bg-[#4CAF50] hover:bg-[#45A049] rounded-md text-white cursor-pointer"
                                    >
                                        Update
                                    </span>
                                    <span
                                        id={product.Product_id}
                                        className="px-4 py-1.5 bg-[#FF4C4C] hover:bg-[#FF1F1F] rounded-md text-white cursor-pointer"
                                    >
                                        Delete
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


{/* <div className="flex-1 text-gray-500">{product.discount_price}</div>

<div className="flex-1">Discount</div> */}





