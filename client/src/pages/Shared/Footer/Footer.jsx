import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Website Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">MatromonY</h1>
          <p className="text-gray-400 mt-2">
            Connecting hearts, building futures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              At MatromonY, we strive to provide a seamless platform for people
              to find their perfect match. Your happiness is our mission.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-blue-400">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="hover:text-blue-400">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-gray-500">
          © {new Date().getFullYear()} MatromonY. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
