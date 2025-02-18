import React, { useState, useEffect } from "react";
import axios from "axios";

const SuccessStoryTable = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      const response = await axios.get(
        "https://marrrrry.vercel.app/api/success-stories-table"
      );
      setSuccessStories(response.data);
    } catch (error) {
      console.error("Error fetching success stories:", error);
    }
  };

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Success Stories</h2>
      <table className="min-w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Male Biodata Id</th>
            <th className="py-2 px-4 border-b">Female Biodata Id</th>
            <th className="py-2 px-4 border-b">View Story</th>
          </tr>
        </thead>
        <tbody>
          {successStories.map((story) => (
            <tr key={story._id}>
              <td className="py-2 px-4 border-b">{story.selfBiodataId}</td>
              <td className="py-2 px-4 border-b">{story.partnerBiodataId}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleViewStory(story)}
                >
                  View Story
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Success Story</h3>
            {selectedStory && (
              <div>
                <div className="mb-4">
                  <h5 className="font-semibold">
                    Marriage Date: {selectedStory.marriageDate}
                  </h5>
                </div>
                <div className="mb-4">
                  <img
                    src={selectedStory.coupleImage || "default_image.jpg"}
                    alt="Couple"
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Review: {selectedStory.review}</p>
                </div>
                <div>
                  <h6 className="font-semibold">
                    Review Stars: {selectedStory.reviewStar}
                  </h6>
                </div>
              </div>
            )}
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStoryTable;
