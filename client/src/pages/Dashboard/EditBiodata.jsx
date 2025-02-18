import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const divisions = [
    "Dhaka",
    "Chattagra",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];
  const heights = ["4'0\"", "4'5\"", "5'0\"", "5'5\"", "6'0\""];
  const weights = ["50kg", "60kg", "70kg", "80kg", "90kg"];
  const occupations = ["Engineer", "Doctor", "Teacher", "Business", "Other"];
  const races = ["Fair", "Medium", "Dark"];

  const [biodata, setBiodata] = useState({
    type: "",
    name: "",
    profileImage: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fathersName: "",
    mothersName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: user.email,
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiodata({ ...biodata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://marrrrry.vercel.app/api/biodatas", biodata);
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error saving biodata.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-sky-200 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Your Biodata</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biodata Type */}
          <div>
            <label className="block mb-2 font-medium">Biodata Type</label>
            <select
              name="type"
              value={biodata.type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={biodata.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-2 font-medium">Profile Image (URL)</label>
            <input
              type="text"
              name="profileImage"
              value={biodata.profileImage}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={biodata.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-2 font-medium">Height</label>
            <select
              name="height"
              value={biodata.height}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Height</option>
              {heights.map((h, index) => (
                <option key={index} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-2 font-medium">Weight</label>
            <select
              name="weight"
              value={biodata.weight}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Weight</option>
              {weights.map((w, index) => (
                <option key={index} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={biodata.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Race */}
          <div>
            <label className="block mb-2 font-medium">Race (Skin Color)</label>
            <select
              name="race"
              value={biodata.race}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Race</option>
              {races.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Fathers Name */}
          <div>
            <label className="block mb-2 font-medium">Father's Name</label>
            <input
              type="text"
              name="fathersName"
              value={biodata.fathersName}
              onChange={handleChange}
              placeholder="Enter father's name"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Mothers Name */}
          <div>
            <label className="block mb-2 font-medium">Mother's Name</label>
            <input
              type="text"
              name="mothersName"
              value={biodata.mothersName}
              onChange={handleChange}
              placeholder="Enter mother's name"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Permanent Division */}
          <div>
            <label className="block mb-2 font-medium">Permanent Division</label>
            <select
              name="permanentDivision"
              value={biodata.permanentDivision}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Division</option>
              {divisions.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Present Division */}
          <div>
            <label className="block mb-2 font-medium">Present Division</label>
            <select
              name="presentDivision"
              value={biodata.presentDivision}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Division</option>
              {divisions.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Partner Age */}
          <div>
            <label className="block mb-2 font-medium">Expected Partner Age</label>
            <input
              type="number"
              name="expectedPartnerAge"
              value={biodata.expectedPartnerAge}
              onChange={handleChange}
              placeholder="Enter expected partner age"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Expected Partner Height */}
          <div>
            <label className="block mb-2 font-medium">Expected Partner Height</label>
            <select
              name="expectedPartnerHeight"
              value={biodata.expectedPartnerHeight}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Height</option>
              {heights.map((h, index) => (
                <option key={index} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block mb-2 font-medium">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={biodata.contactEmail}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-2 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={biodata.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        {/* Occupation */}
<div>
  <label className="block mb-2 font-medium">Occupation</label>
  <select
    name="occupation"
    value={biodata.occupation}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded"
  >
    <option value="">Select Occupation</option>
    {occupations.map((o, index) => (
      <option key={index} value={o}>
        {o}
      </option>
    ))}
  </select>
</div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Save and Publish Now
        </button>
      </form>
    </div>
  );
};

export default EditBiodata;
