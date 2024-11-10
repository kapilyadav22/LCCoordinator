import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useMyContext } from '../Context/globalContext';

const CustomAlert = () => {
  const { alert, closeAlert } = useMyContext();  

  console.log(alert);

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={closeAlert} severity={alert.severity} sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;

