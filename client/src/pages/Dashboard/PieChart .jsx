import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("https://marrrrry.vercel.app/api/chart-data");
        const data = await response.json();
        setChartData(data);
        console.log(chartData);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    fetchChartData();
  }, []);

  // If chartData is not available yet, return a loading message
  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  // Prepare chart data
  const pieChartData = {
    labels: [
      "Total Biodata",
      "Male Biodata",
      "Female Biodata",
      "Premium Biodata",
      //   "Total Revenue",
    ],
    datasets: [
      {
        data: [
          chartData.totalBiodataCount,
          chartData.maleBiodataCount,
          chartData.femaleBiodataCount,
          chartData.premiumBiodataCount,
          //   chartData.revenue,
        ],
        backgroundColor: [
          "#FF6384", // Total Biodata
          "#36A2EB", // Male Biodata
          "#FFCE56", // Female Biodata
          "#4BC0C0", // Premium Biodata
          //   "#FF9F40", // Revenue
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          //   "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="h-96 w-96">
      <h2>Biodata Stats and Revenue</h2>
      <Pie data={pieChartData} />
    </div>
  );
};

export default PieChart;
