import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid2,
  Box
} from "@mui/material";
import { VisualiserCommonUrl } from "../constants/urlConstants";

const VisualizerDialogBox = ({title, url}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openUrl = () => {
    if(url){
      window.open(VisualiserCommonUrl+url, "_blank");
    } 
    // else {
    //   setDefaultEventParameters
    // }
  };

  return (
    <Box sx={{margin: '0.5%', padding : '0.5%'}}>
    
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
      Algorithm Visualiser
      </Button> */}
      <Button variant="contained" color="primary" onClick={openUrl}>
        Visualise {title}
      </Button>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Open a URL</DialogTitle>
        <DialogContent>
          <Typography>
            Click the button below to open the following URL in a new tab:
          </Typography>
          <Typography color="primary">{url}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={openUrl} color="primary" variant="contained">
            Open URL
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default VisualizerDialogBox;
