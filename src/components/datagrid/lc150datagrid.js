import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import columns from './column';
import { lc150RowData } from '../../data/lc150data';
import TopicFilterChips from '../../utils/TopicFilterChips';
import { topics } from '../../data/topics';
import CustomIcon from '../../icons/customicon';

const LC150ProblemsGrid = () => {
  const [rows, setRows] = useState(lc150RowData);
  const [showFilter, setShowFilter] = useState(false);
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

  // const handleCellClick = (params, event) => {
  //   if (params.field === 'attempted') {
  //     event.stopPropagation();
  //     const newRows = [...rows];
  //     const index = newRows.findIndex((row) => row.id === params.id);
  //     newRows[index].attempted = !newRows[index].attempted;
  //     setRows(newRows);
  //   }
  // };

  const handleSwitchChange = () => {
    setShowFilter((prev) => !prev);
  };


  return (
    <Grid container direction="column" alignItems="center" margin={"1%"} padding={"1%"}>
      <Typography variant="h4" gutterBottom>
        LeetCode DSA Problems
      </Typography>
      {
        showFilter &&
        <TopicFilterChips
          uniqueTopics={topics}
          selectedTopics={selectedTopics}
          onChipClick={handleChipClick}
          onReset={handleReset}
          handleRefresh={handleRefresh}
        />
      }
      <FormControlLabel control={ 
      <Switch
        checked={showFilter}
        onChange={(event) => handleSwitchChange()}
        color="primary"
      />
      }
      label="Filters" />

      <Grid item style={{ width: '80%', alignContent: "center" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          columnBuffer={columns.length}
          // pageSize={5} 
          pageSizeOptions={[25, 50, 75, 100]}
          rowsPerPageOptions={[25]}
          checkboxSelection
          autoHeight
          // onCellClick={handleCellClick}
          onCellEditCommit={handleCellEditCommit}
        // disableMultipleRowSelection
        // disableRowSelectionOnClick

        />
      </Grid>
    </Grid>
  );
};

export default LC150ProblemsGrid;
