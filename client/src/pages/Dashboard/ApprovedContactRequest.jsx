import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);

  // Fetch contact requests from the backend
  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await axios.get("https://marrrrry.vercel.app/api/contact-request/admin");
        setContactRequests(response.data);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
      }
    };

    fetchContactRequests();
  }, []);
  console.log(contactRequests);
  // Handle approving a contact request
  const handleApproveRequest = async (requestId) => {
    try {
      await axios.put(`https://marrrrry.vercel.app/api/contact-request/${requestId}`, {
        status: "approved",
      });
      alert("Contact request approved successfully!");

      // Update the UI after approval
      setContactRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: "approved" } : request
        )
      );
    } catch (error) {
      console.error("Error approving contact request:", error);
      alert("Failed to approve the contact request.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Approved Contact Requests</h1>
      {contactRequests.length === 0 ? (
        <p>No contact requests found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Biodata ID</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {contactRequests.map((request) => (
              <tr key={request._id}>
                <td className="px-4 py-2 border">{request.name}</td>
                <td className="px-4 py-2 border">{request.email}</td>
                <td className="px-4 py-2 border">{request.biodataId}</td>
                <td className="px-4 py-2 border">
                  {request.status === "approved" ? (
                    <span className="text-green-500 font-medium">Approved</span>
                  ) : (
                    <button
                      onClick={() => handleApproveRequest(request._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedContactRequest;
