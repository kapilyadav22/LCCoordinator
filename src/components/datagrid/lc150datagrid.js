import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Grid, Typography } from '@mui/material';
import columns from './column';
import { lc150RowData } from '../../data/lc150data';
import TopicFilterChips from '../../utils/TopicFilterChips';
import { topics } from '../../data/topics';
import CustomIcon from '../../icons/customicon';

const LC150ProblemsGrid = () => {
  const [rows, setRows] = useState(lc150RowData);
  const [filteredRows, setFilteredRows] = useState(lc150RowData);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleCellEditCommit = (params) => {
    const updatedRows = rows.map((row) => {
      if (row.id === params.id) {
        return { ...row, [params.field]: params.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleChipClick = (topic) => {
    setSelectedTopics((prev) => {
      const isSelected = prev.includes(topic);
      const newSelectedTopics = isSelected
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];
      const filtered = newSelectedTopics.length
        ? rows.filter((row) => newSelectedTopics.includes(row.topic))
        : rows;
      setFilteredRows(filtered);
      return newSelectedTopics;
    });
  };

  const handleReset = () => {
    setSelectedTopics([]);
    setFilteredRows(rows); 
  };

  const handleRefresh = () => {
    setSelectedTopics([]);
    setFilteredRows(rows); 
  };

  return (
    <Grid container direction="column" alignItems="center" margin={"1%"} padding={"1%"}>
      <Typography variant="h4" gutterBottom>
        LeetCode DSA Problems
      </Typography>
      <TopicFilterChips
        uniqueTopics={topics}
        selectedTopics={selectedTopics}
        onChipClick={handleChipClick} 
        onReset={handleReset} 
        handleRefresh = {handleRefresh}
        />
           
      <Grid item style={{ width: '90%' }}>
        <DataGrid
          rows={filteredRows} 
          columns={columns} 
          // pageSize={5} 
          pageSizeOptions={[25,50,75,100]}
          rowsPerPageOptions={[25]} 
          checkboxSelection 
          autoHeight
          onCellEditCommit={handleCellEditCommit} 
        />
      </Grid>
    </Grid>
  );
};

export default LC150ProblemsGrid;
