import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuccessCounterSection = () => {
  const [stats, setStats] = useState({
    maleBiodataCount: 0,
    femaleBiodataCount: 0,
    completedMarriagesCount: 0
  });

  useEffect(() => {
    // Fetch the data from the backend API
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://marrrrry.vercel.app/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Success Counter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Male Biodata</h3>
            <p className="text-4xl font-bold text-blue-500">{stats.maleBiodataCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Female Biodata</h3>
            <p className="text-4xl font-bold text-pink-500">{stats.femaleBiodataCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Completed Marriages</h3>
            <p className="text-4xl font-bold text-green-500">{stats.completedMarriagesCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounterSection;
