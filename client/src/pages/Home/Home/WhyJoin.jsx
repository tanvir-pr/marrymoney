import { Medal, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhyJoin() {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 md:px-12 text-center">
                {/* Header */}
                <h2 className="text-3xl font-bold text-gray-800">Why Join Our Matrimony Platform?</h2>
                <p className="text-gray-600 mt-2">Find your perfect match with a platform built on trust, authenticity, and meaningful connections.</p>

                {/* Features Grid */}
                <div className="grid md:grid-cols-4 gap-8 mt-10">
                    {/* Verified Profiles */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <Users className="text-green-500 w-12 h-12 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Verified & Genuine Profiles</h3>
                        <p className="text-gray-600 mt-2">We ensure authenticity with real, verified members.</p>
                    </div>

                    {/* Successful Matches */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <Medal className="text-yellow-500 w-12 h-12 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Thousands of Success Stories</h3>
                        <p className="text-gray-600 mt-2">Join a community where love stories come to life.</p>
                    </div>

                    {/* Personalized Matches */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <Clock className="text-red-500 w-12 h-12 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Smart & Personalized Matches</h3>
                        <p className="text-gray-600 mt-2">Find compatible partners based on your preferences.</p>
                    </div>

                    {/* Secure & Private */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <Users className="text-blue-500 w-12 h-12 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Safe & Secure Platform</h3>
                        <p className="text-gray-600 mt-2">Your privacy and security are our top priority.</p>
                    </div>
                </div>

                {/* Call-to-Action */}
                <div className="mt-10">
                    <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                        Join Now & Find Your Match
                    </Link>
                </div>
            </div>
        </section>
    );
}
