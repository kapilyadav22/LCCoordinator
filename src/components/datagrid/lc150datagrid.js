import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, FormControlLabel, Grid, Stack, Switch, Typography } from '@mui/material';
import columns from './column';
import TopicFilterChips from '../../utils/TopicFilterChips';
import { topics } from '../../data/topics';
import CustomIcon from '../../icons/customicon';
import { SERVERURL, V1 } from '../../constants/urlConstants';
import { getData, postData } from '../../utils/httpRequestUtils';

const LC150ProblemsGrid = () => {
  const [rows, setRows] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [file, setFile] = useState(null);
  // const [csvupdated, setCSVUpdated] = useState(false);

  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    const res = await getData(V1 + '/lc150');
    if (res.success) {
      setRows(res.data);
      setFilteredRows(res.data);
    }
};

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


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid CSV file.');
    }
  }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(V1 + '/lc150', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        alert('Upload successful');
        await fetchData(); 
        setFile(null);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleSwitchChange = () => {
    setShowFilter((prev) => !prev);
  };


  return (
    <Grid container direction="column" alignItems="center" margin={"1%"} padding={"1%"}>
      <Stack direction="row" spacing={2} width="80%" alignItems="center">
        <Box flexGrow={1} display="flex" justifyContent="center">
          <Typography variant="h4" align='center'>
            LeetCode DSA Problems
          </Typography>
        </Box>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button variant="contained" component="span">
            Choose CSV File
          </Button>
        </label>
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload CSV
        </Button>
      </Stack>
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
          getRowId={(row) => row.problemId}
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
