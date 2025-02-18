import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const BiodataView = () => {
  const { user } = useContext(AuthContext)
  const [biodata, setBiodata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  // Fetch biodata information
  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const { data } = await axios.get(
          `https://marrrrry.vercel.app/api/biodatas?email=${user.email}`
        );
        setBiodata(data);
      } catch (error) {
        console.error("Error fetching biodata:", error);
      }
    };

    fetchBiodata();
  }, [user.email]);

  // Handle premium request
  const handleMakePremium = async () => {
    try {
      const response = await axios.post(
        "https://marrrrry.vercel.app/api/premiumrequest",
        { biodataId: biodata._id } // Pass the biodata ID
      );
      alert(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error making premium request:", error);
      alert("Failed to request premium status.");
    }
  };

  if (!biodata) return <p>Loading biodata...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-sky-200 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">View Biodata</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Biodata Type:</p>
          <p>{biodata.type}</p>
        </div>
        <div>
          <p className="font-medium">Name:</p>
          <p>{biodata.name}</p>
        </div>
        <div>
          <p className="font-medium">Profile Image:</p>
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div>
          <p className="font-medium">Date of Birth:</p>
          <p>{biodata.dateOfBirth}</p>
        </div>
        <div>
          <p className="font-medium">Height:</p>
          <p>{biodata.height}</p>
        </div>
        <div>
          <p className="font-medium">Weight:</p>
          <p>{biodata.weight}</p>
        </div>
        <div>
          <p className="font-medium">Age:</p>
          <p>{biodata.age}</p>
        </div>
        <div>
          <p className="font-medium">Occupation:</p>
          <p>{biodata.occupation}</p>
        </div>
        <div>
          <p className="font-medium">Race:</p>
          <p>{biodata.race}</p>
        </div>
        <div>
          <p className="font-medium">Father's Name:</p>
          <p>{biodata.fathersName}</p>
        </div>
        <div>
          <p className="font-medium">Mother's Name:</p>
          <p>{biodata.mothersName}</p>
        </div>
        <div>
          <p className="font-medium">Permanent Division:</p>
          <p>{biodata.permanentDivision}</p>
        </div>
        <div>
          <p className="font-medium">Present Division:</p>
          <p>{biodata.presentDivision}</p>
        </div>
        <div>
          <p className="font-medium">Expected Partner Age:</p>
          <p>{biodata.expectedPartnerAge}</p>
        </div>
        <div>
          <p className="font-medium">Expected Partner Height:</p>
          <p>{biodata.expectedPartnerHeight}</p>
        </div>
        <div>
          <p className="font-medium">Expected Partner Weight:</p>
          <p>{biodata.expectedPartnerWeight}</p>
        </div>
        <div>
          <p className="font-medium">Contact Email:</p>
          <p>{biodata.contactEmail}</p>
        </div>
        <div>
          <p className="font-medium">Mobile Number:</p>
          <p>{biodata.mobileNumber}</p>
        </div>
      </div>

      {/* Button to trigger modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Make Biodata to Premium
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Premium Request</h2>
            <p>Are you sure you want to make your biodata premium?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleMakePremium}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Yes, Make Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataView;
