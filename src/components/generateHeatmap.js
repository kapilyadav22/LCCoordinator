import React, { useEffect, useState } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { Container, Grid, Typography } from "@mui/material";

// Mock data generation for 365 days
const generateHeatmapData = () => {
  const data = [];
  const colorScale = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd"];

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
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Year Calendar Submission Heatmap
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <ResponsiveHeatMap
            data={heatmapData}
            keys={Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`)} // Each month has up to 31 days
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default YearCalendarHeatmap;
