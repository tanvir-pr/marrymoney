import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const BiodataDetailsPage = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const { biodataId } = useParams(); // Get the biodata ID from the URL
  const navigate = useNavigate();

  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);

  useEffect(() => {
    fetchBiodata();
    fetchSimilarBiodatas();  
  }, [biodataId]);

  const fetchBiodata = async () => {
    try {
      // const response = await axios.get(`https://marrrrry.vercel.app/api/biodatas?email=${user.email}`);
      // const response = await axios.get(`https://marrrrry.vercel.app/api/biodata/${biodataId}`);
         const response = await axios.get(`https://marrrrry.vercel.app/api/biodata/${biodataId}?email=${user.email}`);

      setBiodata(response.data);
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
  };

  const fetchSimilarBiodatas = async () => {
    try {
      const response = await axios.get(`https://marrrrry.vercel.app/api/biodata/${biodataId}/similar`);
      setSimilarBiodatas(response.data);
    } catch (error) {
      console.error("Error fetching similar biodatas:", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const userEmail = user.email;
      await axios.post("https://marrrrry.vercel.app/api/favorites", {
        biodataId,
        userEmail,
      });
      alert("Biodata added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add biodata to favorites. Please try again.");
    }
  };

  if (!biodata) return <p>Loading biodata details...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-sky-100 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Biodata Details</h1>
      <img
        src={biodata.profileImage || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4"
      />
      <p><strong>Name:</strong> {biodata.name}</p>
      <p><strong>Age:</strong> {biodata.age}</p>
      <p><strong>Type:</strong> {biodata.type}</p>
      <p><strong>Division:</strong> {biodata.permanentDivision}</p>
      <p><strong>Occupation:</strong> {biodata.occupation}</p>

      {/* Show email and phone only if the user is premium */}
      {biodata.isPremium ? (
        <div>
          <p><strong>Email:</strong> {biodata.email}</p>
          <p><strong>Phone:</strong> {biodata.phone}</p>
        </div>
      ) : (
        <button
          onClick={() => navigate(`/checkout/${biodataId}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Request Contact Information
        </button>
      )}

      <button
        onClick={handleAddToFavorites}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
      >
        Add to Favorites
      </button>

      <h2 className="text-xl font-bold mt-6">Similar Biodatas</h2>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {similarBiodatas.map((similar) => (
          <div key={similar._id} className="border bg-sky-300 p-4 rounded">
            <img
              src={similar.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
            <p><strong>Name:</strong> {similar.name}</p>
            <p><strong>Age:</strong> {similar.age}</p>
            <p><strong>Type:</strong> {similar.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiodataDetailsPage;
