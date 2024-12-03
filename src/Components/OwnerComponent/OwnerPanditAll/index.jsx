import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerVerifiedPandits = () => {

  const navigate= useNavigate();
  const verifiedPandits = [
    {
      _id: "673dbe15f3a20771b874fc61",
      name: "Aniket Pandit",
      email: "aniketpandit@gmail.com",
      phone: "+1-234-567-8901",
      createdAt: "2024-11-20",
    },
    {
      _id: "673dbe15f3a20771b874fc62",
      name: "Rajeev Pandit",
      email: "rajeevepandit@example.com",
      phone: "+1-345-678-9012",
      createdAt: "2024-11-21",
      key:2
    },
    {
      _id: "673dbe15f3a20771b874fc63",
      name: "Priya Pandit",
      email: "priyapandit@example.com",
      phone: "+1-456-789-0123",
      createdAt: "2024-11-22",
      key:3
    },
  ];

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

  const filteredPandits = verifiedPandits.filter(
    (pandit) => pandit._id.includes(searchQuery) || pandit.name.toLowerCase().includes(searchQuery.toLowerCase())
      || pandit.email.includes(searchQuery.toLowerCase()) || pandit.phone.includes(searchQuery.toLowerCase())
      || pandit.createdAt.includes(searchQuery)
  )

  const totalPage = Math.ceil(filteredPandits.length / rowsPerPage)
  const paginatedPandits = filteredPandits.slice(
    (curntPage - 1) * rowsPerPage, curntPage * rowsPerPage
  )

  const handleBtnClick = (whichBtn) => {
    if (whichBtn === 'next') {
      setCurntPage((prev) => prev + 1)
    } else if (whichBtn === 'prev') {
      setCurntPage((prev) => prev - 1)
    }
  }

  const detailBtnClick= (e) => {
    const { id }= e.target
    navigate(`/owner/pandits/${id}`)
  }

  return (
    <div className="p-6 bg-[#f2f2f2] container">
      <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md shadow hover:bg-gray-200 transition-colors duration-200"
          >
            ← Back
          </button>
      <h1 className="text-3xl font-bold text-[#2d2f36] mb-6 text-center">Verified Pandit</h1>

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
              <th className="py-2 border-b">ID</th>
              <th className="py-2 border-b">Name</th>
              <th className="py-2 border-b">Email</th>
              <th className="py-2 border-b">Phone</th>
              <th className="py-2 border-b">Accepted At</th>
              <th className="py-2 border-b">Detail</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedPandits.map((pandits, index) => <tr key={index} className="border-b">
                <td className="py-3">{pandits._id}</td>
                <td className="py-3">{pandits.name}</td>
                <td className="py-3">{pandits.email}</td>
                <td className="py-3">{pandits.phone}</td>
                <td className="py-3">{pandits.createdAt}</td>
                <td className="capitalize py-3">
                  <span 
                  id={pandits._id}  
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
          paginatedPandits.length === 0 &&
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

export default OwnerVerifiedPandits;
