import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LOGIN, navigationTimer, VERIFYEMAIL } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';
import CustomAvatar from '../layout/CustomAvatar';
import { getData } from '../utils/httpRequestUtils';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { alert, showAlert } = useCustomAlert();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    if (!token) {
      setVerificationStatus('Invalid verification link');
      showAlert('error', 'Invalid verification link');
      return;
    }

    try {
      const response = await getData(VERIFYEMAIL + `?email=${email}&token=${token}`);
      
      if (response.status === "success") {
        setVerificationStatus('Email verified successfully!');
        showAlert('success', 'Email verified successfully');
        setTimeout(() => {
          navigate(LOGIN);
        }, navigationTimer);
      } else {
        setVerificationStatus('Email verification failed');
        showAlert('error', response);
      }
    } catch (error) {
      setVerificationStatus('Email verification failed');
      showAlert('error', 'Something went wrong');
    }
  };

 

  return (
    <Container component="main" maxWidth="xs">
      <CustomAlert1 alert={alert} />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomAvatar />
        <Typography component="h1" variant="h5" sx={{ mt: 2 ,color:'text.primary'}}>
          Email Verification
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center',color:'text.primary' }}>
          {verificationStatus}
        </Typography>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
