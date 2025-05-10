import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import VisualizerDialogBox from '../components/VisualizerDialogBox';
import { UPLOADCSV } from '../constants/urlConstants';
import { useMyContext } from '../Context/ContextProvider';
import { ThemeContext } from "../Context/ThemeContext.js";
import useCustomAlert from '../customHooks/customAlertHook';
import columns from '../dataFields/column';
import { topics } from '../dataFields/filterTopics';
import { getData } from '../utils/httpRequestUtils';
import CustomAlert1 from './CustomAlert1';
import { CustomTitle } from './CustomTitle';
import TopicFilterChips from './TopicFilterChips';


const CommonDataGrid = ({ title, dataFetchUrl, dataGridColumns, uniqueTopics, pageName, visualObject }) => {
  const [rows, setRows] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [file, setFile] = useState(null);
  const { adminStatus } = useMyContext();
  const { alert, showAlert } = useCustomAlert();

  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const res = await getData(dataFetchUrl);
    if (res.status === "success") {
      setRows(res.data);
      setFilteredRows(res.data);
    } else {
      showAlert("error", res);
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
        ? rows.filter((row) =>
            newSelectedTopics.some((selectedTopic) =>
              row.topic.split(',').map((t) => t.trim()).includes(selectedTopic)
            )
          )
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
      showAlert('Please upload a valid CSV file.');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    if (file === null) {
      showAlert("error", "Please Upload a Valid CSV File");
      return;
    }

    try {
      const response = await fetch(dataFetchUrl + UPLOADCSV, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        showAlert("error", "Error Uploading File");
        return;
      }

      showAlert("success", 'Upload successful');
      await fetchData();
      setFile(null);
    } catch (error) {
      showAlert("error", 'Error Uploading File');
    }
  };

  const handleSwitchChange = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <Grid margin="1%" padding="1%">
      <Grid container direction="column" alignItems="center" sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>

        <CustomAlert1 alert={alert} />

        <Stack direction="row" spacing={2} width={{ xs: '100%', sm: '80%' }} alignItems="center" sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box flexGrow={1} display="flex" justifyContent="center">
            <CustomTitle title={title} />
          </Box>
          {(adminStatus === "Admin_Kapil") && (
            <>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="csv-upload" />
              <label htmlFor="csv-upload">
                <Button variant="contained" component="span">
                  Choose CSV File
                </Button>
              </label>
              <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload CSV
              </Button>
            </>
          )}
        </Stack>

        {showFilter && (
          <TopicFilterChips
            uniqueTopics={uniqueTopics ? uniqueTopics : topics}
            selectedTopics={selectedTopics}
            onChipClick={handleChipClick}
            onReset={handleReset}
            handleRefresh={handleRefresh}
          />
        )}
        <FormControlLabel
          control={
            <Switch
               color= {showFilter? 'blue':'red'}
            sx={{
              '& .MuiSwitch-track': {
                backgroundColor: showFilter?(mode=='light'?'blue':'yellow'):(mode=='light'?'white':'grey'),
              },
            }}
              checked={showFilter}
              onChange={handleSwitchChange}
            />
          }
          label= {<Typography color='text.primary'>Filters</Typography>}
        />
        <Grid
          item
          sx={{
            width: '100%',
            overflowX: 'auto',
            // background: mode== 'light'?'white':'grey',
            maxHeight: { xs: 'calc(100vh - 200px)', sm: '80vh' },
            '& .MuiDataGrid-root': {
              '@media (max-width: 600px)': {
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  minWidth: '80px !important',
                  padding: '4px',
                  fontSize: '0.75rem'
                }
              }
            }
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={dataGridColumns ? dataGridColumns : columns}
            autoHeight
            columnBuffer={dataGridColumns ? dataGridColumns.length : columns.length}
            getRowId={(row) => row.problemId}
            pageSizeOptions={[25, 50, 75, 100]}
            rowsPerPageOptions={[25]}
            // checkboxSelection
            onCellEditCommit={handleCellEditCommit}
            density="compact"
            headerHeight={56}
            sx={{
              width: '100%',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'black', 
                color: 'white',
              },
              '& .MuiDataGrid-cell': {
                backgroundColor: '#ffffff', 
                color: 'black', 
              },
             
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: { xs: '4px', sm: '16px' },
          padding: { xs: '4px', sm: '16px' },
          gap: { xs: '8px', sm: '16px' },
          width: '100%'
        }}
      >
        {visualObject && Object.keys(visualObject).length > 0 &&
          Object.entries(visualObject).map(([key, value], index) => (
            <Grid
              item
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: { xs: '100%', sm: 'auto' },
                minWidth: { sm: '210px' },
                flex: { sm: '1 1 0' },
                marginBottom: { xs: '4px', sm: 0 }
              }}
            >
              <VisualizerDialogBox title={key} url={value} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );
};

export default CommonDataGrid;
