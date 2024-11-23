import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useMyContext } from '../Context/ContextProvider';

const CustomAlert = (props) => {
  const { alert, closeAlert } = useMyContext();  

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={props.closeAlert?props.closeAlert:closeAlert} severity={props.alert?props.alert.severity:alert.severity} sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;

