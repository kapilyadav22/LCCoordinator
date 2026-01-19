import { useEffect, useState } from "react";
// import { ResponsiveHeatMap } from "@nivo/heatmap";

// Mock data generation for 365 days
const generateHeatmapData = () => {
  const data = [];
  const colorScale = [
    "#f7fbff",
    "#deebf7",
    "#c6dbef",
    "#9ecae1",
    "#6baed6",
    "#3182bd",
  ];

  for (let i = 1; i <= 12; i++) {
    const monthData = [];
    for (let j = 1; j <= 31; j++) {
      const value = Math.floor(Math.random() * 6); // Random activity level from 0 to 5
      monthData.push({ day: j, value });
    }
    data.push({
      id: `Month ${i}`,
      data: monthData,
    });
  }

  return data;
};

const YearCalendarHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, []);

  return (
    <div className="w-full px-4">
      <h4 className="text-2xl text-center font-normal mb-6 text-text-primary">
        Year Calendar Submission Heatmap
      </h4>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">
          {/* 
          <ResponsiveHeatMap
            data={heatmapData}
            keys={Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`)} 
            indexBy="id"
            margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
            colors={["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd"]}
            colorScale="quantize"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Days",
              legendPosition: "middle",
              legendOffset: 36,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Months",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            cellStyle={{
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          /> 
          */}
        </div>
      </div>
    </div>
  );
};

export default YearCalendarHeatmap;
