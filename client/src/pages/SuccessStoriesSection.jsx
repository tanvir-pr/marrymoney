import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const SuccessStoriesSection = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get("https://marrrrry.vercel.app/api/success-stories");
      setStories(response.data);
    } catch (error) {
      console.error("Failed to fetch success stories:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Success Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="p-4 bg-white shadow-md rounded-lg">
            {/* Couple Image */}
            <img
              src={story.coupleImage || "/default-couple.png"} // Fallback to default image
              alt="Couple"
              className="w-full h-40 object-cover rounded"
            />

            {/* Marriage Date */}
            <h3 className="text-lg font-bold mt-4 text-gray-800">
              Married on: {new Date(story.marriageDate).toLocaleDateString()}
            </h3>

            {/* Review Stars */}
            <div className="flex items-center mt-2">
              {[...Array(story.reviewStar)].map((_, index) => (
                <Star key={index} className="text-yellow-400 w-5 h-5" />
              ))}
            </div>

            {/* Success Story Text */}
            <p className="text-gray-600 mt-4">{story.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoriesSection;
