import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import CustomAvatar from '../layout/CustomAvatar';
import CustomTextField from '../layout/CustomTextField';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';
import { validateEmail, validateFields } from '../utils/checkValidations';
import { getData, postData } from '../utils/httpRequestUtils';
import { FORGETPASSWORD, HOMEROUTE, navigationTimer } from '../constants/urlConstants';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setError(error);
      return;
    }

    try {
      const response = await getData(FORGETPASSWORD + "?email=" + email);
      
      if (response.status === "success") {
        showAlert("success", "OTP sent successfully to your email");
        setTimeout(() => {
          navigate('/verify-otp',
            {
                state: {
                  email: email
                }
            }
          );
        }, navigationTimer);
      } else {
        showAlert("error", response);
      }
    } catch (error) {
      showAlert("error", "Something went wrong");
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
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
          Enter your email address and we'll send you an OTP to reset your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <CustomTextField
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send OTP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
