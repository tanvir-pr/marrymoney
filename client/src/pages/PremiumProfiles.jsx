import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PremiumProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order: ascending
  const navigate = useNavigate();

  // Fetch premium profiles when the component loads or sortOrder changes
  useEffect(() => {
    fetchPremiumProfiles();
  }, [sortOrder]);

  const fetchPremiumProfiles = async () => {
    try {
      const response = await axios.get("https://marrrrry.vercel.app/api/premium-biodatas", {
        params: { sort: sortOrder },
      });
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching premium profiles:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Premium Members</h2>

      <div className="flex justify-between items-center mb-4">
        <label htmlFor="sortOrder" className="font-medium text-gray-700">
          Sort by Age:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile.biodataId} className="border rounded-lg p-4 shadow-md">
            <img
              src={profile.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <p><strong>Biodata ID:</strong> {profile.biodataId}</p>
            <p><strong>Type:</strong> {profile.type}</p>
            <p><strong>Division:</strong> {profile.permanentDivision}</p>
            <p><strong>Age:</strong> {profile.age || "N/A"}</p>
            <p><strong>Occupation:</strong> {profile.occupation || "N/A"}</p>
            <button
              onClick={() => navigate(`/biodataDetailsPage/${profile._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumProfiles;
