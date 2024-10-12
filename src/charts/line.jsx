import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const FarmLineGraph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Oct 10", "Oct 11", "Oct 12", "Oct 13", "Oct 14"], // X-axis dates
        datasets: [
          {
            label: "North Field Soil Moisture (%)",
            data: [20, 25, 30, 35, 32], // Example soil moisture values over time
            borderColor: "#6a994e", // Line color for North Field
            backgroundColor: "rgba(106, 244, 78, 0.214)", // Light fill for North Field
            fill: true,
            tension: 0.4, // Curve the line
          },
          {
            label: "East Field Soil Moisture (%)",
            data: [22, 28, 27, 33, 30], // Example soil moisture values for East Field
            borderColor: "#f9c74f", // Line color for East Field
            backgroundColor: "rgba(249, 199, 79, 0.214)", // Light fill for East Field
            fill: true,
            tension: 0.4, // Curve the line
          },
          {
            label: "South Field Soil Moisture (%)",
            data: [18, 23, 28, 26, 29], // Example soil moisture values for South Field
            borderColor: "#f94144", // Line color for South Field
            backgroundColor: "rgba(249, 65, 68, 0.214)", // Light fill for South Field
            fill: true,
            tension: 0.4, // Curve the line
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true, // Display the legend for field-specific data
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Soil Moisture (%)', // Y-axis label
            },
            grid: {
              display: true, // Show grid lines on the Y-axis
            },
            beginAtZero: true,
          },
          x: {
            title: {
              display: true,
              text: 'Date', // X-axis label
            },
            grid: {
              display: false, // Remove X-axis grid lines
            },
          },
        },
      },
    });

    return () => {
      chart.destroy(); // Clean up on unmount
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-64"></canvas>;
};

export default FarmLineGraph;