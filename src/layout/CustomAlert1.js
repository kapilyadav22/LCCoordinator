import { Alert, Snackbar } from '@mui/material';

const CustomAlert1 = ({ alert, closeAlert }) => {
    
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

export default CustomAlert1;
