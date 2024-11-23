import { useState } from 'react';
import { alertInitialData } from '../dataFields/alertData';

const useCustomAlert = () => {
  const [alert, setAlert] = useState(alertInitialData);

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
    setTimeout(() => setAlert(alertInitialData), 2000); 
  };

  return {
    alert,
    showAlert
  };
};

export default useCustomAlert;
