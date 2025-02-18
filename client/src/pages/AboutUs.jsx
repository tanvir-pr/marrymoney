import React from "react";
import { FaUsers, FaRocket, FaRegLightbulb } from "react-icons/fa"; // Font Awesome Icons

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Learn more about our mission, vision, and the values that drive us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to create a platform that connects individuals in
              meaningful ways. We aim to simplify the process of finding the
              right partner, empowering our users to build strong and lasting
              connections.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <FaRocket size={150} className="text-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
          <div className="order-2 md:order-1 flex justify-center items-center">
            <FaRegLightbulb size={150} className="text-gray-800" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where technology bridges gaps between people,
              fostering trust and understanding. Our platform is designed to be
              inclusive and accessible to all, helping individuals achieve their
              dreams of companionship.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            A dedicated team of passionate professionals working tirelessly to
            ensure your experience is seamless and enjoyable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <FaUsers size={60} className="text-gray-800 mb-4" />
              <h3 className="text-lg font-bold text-gray-800">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <FaUsers size={60} className="text-gray-800 mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <FaUsers size={60} className="text-gray-800 mb-4" />
              <h3 className="text-lg font-bold text-gray-800">Alice Brown</h3>
              <p className="text-gray-600">Head of Marketing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
