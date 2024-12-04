import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerVerifiedSellers = () => {

  const navigate = useNavigate();
  
  const verifiedSellers= useSelector( state => state.seller_list.sellerList )
    // const verifiedSellers = [
    // {
    //   userId: {
    //     firstName: "rsdfgd",
    //     lastName: "dgdsg",
    //     email: "dsgdjk489erg"
    //   },
    //   shop_name: "uerbfa sanf74ewer  ref",
    //   shop_contact: "+1-234-567-8901",
    //   AadhaarNum: "2024114520",
    // },
    // {
    //   userId: {
    //     firstName: "s54gttrg",
    //     lastName: "rtwegw56",
    //     email: "rtewgert45g"
    //   },
    //   shop_name: "uerbfa sanf74ewer  ref",
    //   shop_contact: "+1-234-567-8901",
    //   AadhaarNum: "2024114520",
    // },
    // {
    //   userId: {
    //     firstName: "dfgdssw",
    //     lastName: "wewertwe",
    //     email: "dfsgsdgsdgsd"
    //   },
    //   shop_name: "gdfd sanf74ewer  ref",
    //   shop_contact: "+1-234-567-8901",
    //   AadhaarNum: "2024114520",
    // },
    // ];

  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [curntPage, setCurntPage] = useState(1);

  const handleSearchQuery = (e) => {
    const { value } = e.target
    setSearchQuery(value);
  }

  const handleRowChange = (e) => {
    const { value } = e.target
    setRowsPerPage(Number(value))
  }

  const filteredSellers = verifiedSellers.filter(
    (seller) => seller.userId.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      || seller.userId.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      || seller.userId.email.includes(searchQuery) || seller.shop_contact.includes(searchQuery)
      || seller.AadhaarNum.includes(searchQuery)
      || seller.shop_name.toLowerCase().includes(searchQuery.toLowerCase())

  )

  const totalPage = Math.ceil(filteredSellers.length / rowsPerPage)

  const paginatedSellers = filteredSellers.slice(
    (curntPage - 1) * rowsPerPage, curntPage * rowsPerPage
  )

  const handleBtnClick = (whichBtn) => {
    if (whichBtn === 'next') {
      setCurntPage((prev) => prev + 1)
    } else if (whichBtn === 'prev') {
      setCurntPage((prev) => prev - 1)
    }
  }

  const detailBtnClick = (e) => {
    const { id } = e.target
    navigate(`/owner/sellers/${id}`)
  }

  return (
    <>
      {
        verifiedSellers.length === 0
          ?
          <div className="w-full h-[90vh] flex justify-center items-center mx-auto container relative">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md absolute top-[5%] left-0 shadow hover:bg-gray-200 transition-colors duration-200"
            >
              ← Back
            </button>
            <p className="text-2xl font-semibold text-center text-gray-700">
              Verified Sellers are not added
            </p>
          </div>
          :
          <div className="p-6 bg-[#f2f2f2] container">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md shadow hover:bg-gray-200 transition-colors duration-200"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-[#2d2f36] text-center mb-6">Verified Sellers</h1>

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

            <div className="w-[90%] mx-auto bg-white shadow-md px-6 py-4 rounded-md">

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

              <table className="w-full text-center text-[0.95rem]">
                <thead>
                  <tr className="text-gray-500">
                    <th className="py-2 border-b">Name</th>
                    <th className="py-2 border-b">Email</th>
                    <th className="py-2 border-b">Contact</th>
                    <th className="py-2 border-b">Aadhaar No.</th>
                    <th className="py-2 border-b">Shop Name</th>
                    <th className="py-2 border-b">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    paginatedSellers.map((seller, index) => <tr key={index} className="border-b">
                      <td className="py-3">{seller.userId.firstName + " " + seller.userId.lastName}</td>
                      <td className="py-3">{seller.userId.email}</td>
                      <td className="py-3">{seller.shop_contact}</td>
                      <td className="py-3">{seller.AadhaarNum}</td>
                      <td className="py-3">{seller.shop_name}</td>
                      <td className="capitalize py-3">
                        <span
                          id={seller._id}
                          onClick={detailBtnClick}
                          className="px-1.5 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md text-white cursor-pointer">
                          view Details
                        </span>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>

              {
                paginatedSellers.length === 0 &&
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

export default OwnerVerifiedSellers;
