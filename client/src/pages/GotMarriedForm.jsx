import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, AlertTriangle } from "lucide-react";

const GotMarriedForm = () => {
  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    review: "",
    marriageDate: "",
    reviewStar: 5,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { selfBiodataId, partnerBiodataId, coupleImage, review, marriageDate } = formData;
    if (!selfBiodataId || !partnerBiodataId || !coupleImage || !review || !marriageDate) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("https://marrrrry.vercel.app/api/success-stories", formData);
      if (response.status === 201) {
        setSuccessMessage("Your success story has been submitted!");
        setErrorMessage("");
        setFormData({
          selfBiodataId: "",
          partnerBiodataId: "",
          coupleImage: "",
          review: "",
          marriageDate: "",
          reviewStar: 5,
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit your story. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Got Married? Share Your Story!</h2>

      {successMessage && (
        <div className="flex items-center bg-green-100 text-green-600 p-4 mb-4 rounded">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center bg-red-100 text-red-600 p-4 mb-4 rounded">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Self Biodata ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Self Biodata ID</label>
          <input
            type="text"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            placeholder="Enter your biodata ID"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Partner Biodata ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Partner Biodata ID</label>
          <input
            type="text"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            placeholder="Enter your partner's biodata ID"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Couple Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Couple Image</label>
          <input
            type="text"
            name="coupleImage"
            value={formData.coupleImage}
            onChange={handleChange}
            placeholder="Enter image URL or upload an image"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Success Story Review */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Success Story Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Share your experience using this website"
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Marriage Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Marriage Date</label>
          <input
            type="date"
            name="marriageDate"
            value={formData.marriageDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Review Star */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Review Star</label>
          <select
            name="reviewStar"
            value={formData.reviewStar}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Success Story
        </button>
      </form>
    </div>
  );
};

export default GotMarriedForm;
