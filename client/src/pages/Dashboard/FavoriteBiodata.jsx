import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthProvider, { AuthContext } from "../../providers/AuthProvider";

const FavoriteBiodata = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://marrrrry.vercel.app/api/favorites?email=${user.email}`
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorite biodatas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user.email]);

  // Handle deleting a favorite
  const handleDelete = async (biodataId) => {
    try {
      const response = await axios.delete("https://marrrrry.vercel.app/api/favorites", {
        data: {
          biodataId: biodataId, // Pass the biodataId as a string
          userEmail: user.email, // Ensure userEmail matches the logged-in user
        },
      });

      alert(response.data.message);

      // Update the state to reflect the deleted favorite
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.biodataId !== biodataId)
      );
    } catch (error) {
      console.error("Error deleting favorite:", error);
      alert("Failed to delete the favorite biodata. Please try again.");
    }
  };



  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">My Favourites Biodata</h1>
        <p>Loading your favorite biodatas...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">My Favourites Biodata</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render favorites list
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-sky-100 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Favourites Biodata</h1>

      {favorites.length === 0 ? (
        <p>You have no favorite biodatas. Start adding some!</p>
      ) : (
        <table className="min-w-full bg-green-200 table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Biodata Id</th>
              <th className="px-4 py-2 border">Permanent Address</th>
              <th className="px-4 py-2 border">Occupation</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => (
              <tr key={fav.biodataId} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{fav.name || "N/A"}</td>
                <td className="px-4 py-2 border">{fav.biodataId}</td>
                <td className="px-4 py-2 border">{fav.permanentDivision || "N/A"}</td>
                <td className="px-4 py-2 border">{fav.occupation || "N/A"}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(fav.biodataId)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavoriteBiodata;
