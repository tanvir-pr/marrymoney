export default function AboutMatrimony() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">About Our Matrimony Platform</h2>
                    <p className="text-gray-600 mt-2">
                        Helping you find meaningful connections and lifelong happiness.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Image */}
                    <div>
                        <img 
                            src="https://i.ibb.co/wZQn3dBw/oo.png" 
                            alt="Happy couple" 
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">💍 Our Mission</h3>
                        <p className="text-gray-600 mt-3">
                            We believe in creating a platform where individuals can find their perfect match 
                            based on trust, compatibility, and shared values. Our mission is to help people build 
                            meaningful relationships that last a lifetime.
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-800 mt-6">❤️ Why Choose Us?</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
                            <li>🔍 Verified and authentic profiles</li>
                            <li>💬 Private and secure communication</li>
                            <li>💖 Personalized matchmaking based on preferences</li>
                            <li>🎉 Thousands of success stories and happy marriages</li>
                        </ul>

                        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
