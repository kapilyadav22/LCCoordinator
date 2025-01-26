import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN, navigationTimer, RESETPASSWORD, VERIFYOTP } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';
import CustomAvatar from '../layout/CustomAvatar';
import CustomTextField from '../layout/CustomTextField';
import { validateOTP } from '../utils/checkValidations';
import { postData } from '../utils/httpRequestUtils';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { alert, showAlert } = useCustomAlert();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(5);
  const [isResendOTP, setIsResendOTP] = useState(false);
  const [isActive, setIsActive] = useState(true);


  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);


  const ResetPassword = async (email, password) => {
    try {
      const response = await postData(RESETPASSWORD, { email, password });
      if (response.status === "success") {
        showAlert("success", "Password reset successfully");
        setTimeout(() => {
          navigate(LOGIN);
        }, navigationTimer);
      } else {
        showAlert("error", "Something went wrong");
      }
    } catch (error) {
      showAlert("error", "Something went wrong");
    }
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password === confirmPassword) {
        ResetPassword(email, password);
    } else {
      showAlert("error", "Password and Confirm Password do not match");
    }
  }


  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    if (validateOTP(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await postData(VERIFYOTP, { email, otp });
      
      if (response.status === "success") {
        showAlert("success", "OTP verified successfully");
      } else {
        showAlert("error", "Invalid OTP");
      }
    } catch (error) {
      showAlert("error", "Something went wrong");
    }
  };

  const handleResendOTP = () => {
    setIsActive(isActive)
    setIsResendOTP(true);
    setTimer(60);
  };    

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value);
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
          Verify OTP
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
          Please enter the 6-digit OTP sent to your email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
         
          {timer > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </Typography>
          )}
          
         
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <CustomTextField
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                required
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*'
                }}
              />
            </Box>
            <Button
              variant="text"
              onClick={handleVerifyOTP}
              sx={{ height: 56 }} 
            >
              Verify OTP
            </Button>
          </Box>

          <CustomTextField
            label="Enter New Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <CustomTextField
            label="Enter Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
          <Button
            fullWidth
              variant="text"
              disabled={timer === 0 ? false : true}
              onClick={handleResendOTP}
              sx={{ height: 56, alignContent: 'center', justifyContent: 'center', mt: '5px' }} 
            >
              Resend OTP
            </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyOTP;
