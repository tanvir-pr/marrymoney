import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const BiodatasPage = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filters, setFilters] = useState({
    ageRange: "",
    type: "",
    division: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const divisions = ["Dhaka", "Chattagra", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
  const itemsPerPage = 20; // Matches backend limit

  useEffect(() => {
    fetchBiodatas();
  }, [filters, currentPage]);

  const fetchBiodatas = async () => {
    try {
      const query = new URLSearchParams({
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
      }).toString();

      const response = await axios.get(`https://marrrrry.vercel.app/api/biodata?${query}`);
      setBiodatas(response.data.biodatas);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching biodatas:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-white pt-16">
      {/* Filter Section */}
      <div className="w-1/4 p-6 bg-black shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Filter Options</h3>
        
        <div className="mb-4">
          <label className="block text-white">Biodata Type</label>
          <select
            name="type"
            onChange={handleFilterChange}
            className="w-full p-2 mt-2 border rounded-lg bg-white"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-white">Division</label>
          <select
            name="division"
            onChange={handleFilterChange}
            className="w-full p-2 mt-2 border rounded-lg bg-white"
          >
            <option value="">All</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white">Age Range</label>
          <input
            type="text"
            name="ageRange"
            placeholder="e.g., 20,40"
            onChange={handleFilterChange}
            className="w-full p-2 mt-2 border rounded-lg bg-white"
          />
        </div>
      </div>

      {/* Biodata Display Section */}
      <div className="w-3/4 p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Biodatas</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {biodatas.map((biodata) => (
            <div
              key={biodata.id}
              className="bg-rose-400 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <NavLink to={`/biodataDetailsPage/${biodata._id}`}>
                <img
                  src={biodata.profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
                />
              </NavLink>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Biodata #{biodata.id}</h4>
              <p className="text-gray-600">Type: {biodata.type}</p>
              <p className="text-gray-600">Division: {biodata.permanentDivision}</p>
              <p className="text-gray-600">Age: {biodata.age}</p>
              <p className="text-gray-600">Occupation: {biodata.occupation}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodatasPage;
