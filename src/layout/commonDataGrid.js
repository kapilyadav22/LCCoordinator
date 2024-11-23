import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import TopicFilterChips from './TopicFilterChips';
import columns from '../dataFields/column';
import { getData } from '../utils/httpRequestUtils';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from './CustomAlert1';

const CommonDataGrid = ({ title, dataFetchUrl, dataGridColumns, uniqueTopics }) => {
  const [rows, setRows] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [file, setFile] = useState(null);

  const { alert, showAlert } = useCustomAlert();

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const res = await getData(dataFetchUrl);
    if (res.success) {
        setRows(res.data);
        setFilteredRows(res.data);
      } else {
        showAlert("error", "Unable to fetch the data, Please try again");
      }
};

  const handleCellEditCommit = (params) => {
    const updatedRows = rows.map((row) =>
      row.id === params.id ? { ...row, [params.field]: params.value } : row
    );
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
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(dataFetchUrl, {
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
    <Grid container direction="column" alignItems="center" margin="1%" padding="1%">
      <CustomAlert1 alert={alert} />
      <Stack direction="row" spacing={2} width="80%" alignItems="center">
        <Box flexGrow={1} display="flex" justifyContent="center">
          <Typography variant="h4" align="center">
            {title}
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
      {showFilter && (
        <TopicFilterChips
          uniqueTopics={uniqueTopics}
          selectedTopics={selectedTopics}
          onChipClick={handleChipClick}
          onReset={handleReset}
          handleRefresh={handleRefresh}
        />
      )}
      <FormControlLabel
        control={
          <Switch
            checked={showFilter}
            onChange={handleSwitchChange}
            color="primary"
          />
        }
        label="Filters"
      />
      <Grid item style={{ width: '80%', alignContent: 'center' }}>
        <DataGrid
          rows={filteredRows}
          columns={dataGridColumns?dataGridColumns:columns}
          autoHeight
          columnBuffer={dataGridColumns?dataGridColumns.length:columns.length}
          getRowId={(row) => row.problemId}
          pageSizeOptions={[25, 50, 75, 100]}
          rowsPerPageOptions={[25]}
          checkboxSelection
          onCellEditCommit={handleCellEditCommit}
        />
      </Grid>
      
    </Grid>
  );
};

export default CommonDataGrid;
