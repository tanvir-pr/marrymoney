import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedPremium = () => {
  const [premiumRequests, setPremiumRequests] = useState([]);

  // Fetch premium approval requests
  const fetchPremiumRequests = async () => {
    try {
      const { data } = await axios.get("https://marrrrry.vercel.app/dashboard/approvedPremium");
      setPremiumRequests(data);
    } catch (error) {
      console.error("Error fetching premium requests:", error);
    }
  };

  useEffect(() => {
    fetchPremiumRequests();
  }, []);

  const handleMakePremium = async (biodataId) => {
    try {
      const { data } = await axios.post(
        "https://marrrrry.vercel.app/dashboard/approvedPremium/makePremium",
        { biodataId }
      );
      alert(data.message);
      fetchPremiumRequests(); // Refresh the list after approval
    } catch (error) {
      console.error("Error making premium:", error);
      alert("Failed to approve premium status.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Approved Premium Requests</h1>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Biodata ID</th>
            <th className="py-2 px-4 border">Make Premium</th>
          </tr>
        </thead>
        <tbody>
          {premiumRequests.map((request) => (
            <tr key={request._id}>
              <td className="py-2 px-4 border">{request.name}</td>
              <td className="py-2 px-4 border">{request.contactEmail}</td>
              <td className="py-2 px-4 border">{request._id}</td>
              <td className="py-2 px-4 border text-center">
                <button
                  onClick={() => handleMakePremium(request._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Make Premium
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedPremium;
