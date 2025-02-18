import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const MyContactRequests = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch contact requests from the server
  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const { data } = await axios.get(
          `https://marrrrry.vercel.app/api/contact-request?userEmail=${user.email}`
        );
        setContactRequests(data);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
      }
    };

    fetchContactRequests();
  }, [user.email]);

  // Handle deleting a contact request
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://marrrrry.vercel.app/api/contact-request/${id}`
      );
      alert(response.data.message);
      setContactRequests(
        contactRequests.filter((request) => request._id !== id)
      ); // Remove from UI
    } catch (error) {
      console.error("Error deleting contact request:", error);
      alert("Failed to delete contact request.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-sky-100 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Contact Requests</h1>

      <table className="min-w-full bg-green-200 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">Biodata ID</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Mobile No</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No contact requests found
              </td>
            </tr>
          ) : (
            contactRequests.map((request) => (
              <tr key={request._id}>
                <td className="px-4 py-2 border-b">{request.biodataId}</td>
                <td className="px-4 py-2 border-b">{request.status}</td>
                {/* Show email and mobile number only if the status is "approved" */}
                {request.status === "approved" ? (
                  <>
                    <td className="px-4 py-2 border-b">{request.name}</td>
                    <td className="px-4 py-2 border-b">{request.mobileNumber}</td>
                    <td className="px-4 py-2 border-b">{request.email}</td>
                  </>
                ) : (
                    <>
                      <td className="px-4 py-2 border-b">{request.name}</td>
                    <td className="px-4 py-2 border-b">N/A</td>
                    <td className="px-4 py-2 border-b">N/A</td>
                  </>
                )}
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyContactRequests;
