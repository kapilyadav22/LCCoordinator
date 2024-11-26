import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../utils/httpRequestUtils';
import { HOMEROUTE, navigationTimer, REGISTERURL, SERVERURL } from '../constants/urlConstants';
import { validateFields } from '../utils/checkValidations';
import CustomAvatar from '../layout/CustomAvatar';
import { SignUpFormData } from '../dataFields/formData';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';

const SignupPage = () => {
  const [formData, setFormData] = useState(SignUpFormData);
  const [error, setError] = useState('');
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const handleSignUpDetails = async (data) => {
    const res = await postData(REGISTERURL,data);
    if(res.success){
      showAlert("success", "SignUp Successfully, Please Login to Continue");
      
      setTimeout(() => {
        navigate(HOMEROUTE);
      }, navigationTimer);
    } else {
      showAlert('error', res.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const error = validateFields('signup', formData.email, formData.password, formData.name);
    if (error) {
      setError(error);
      return;
    }
    handleSignUpDetails(formData);
    setFormData(SignUpFormData);
    setError('');
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
       
       <CustomAvatar/>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
      
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
            {/* <TextField
            margin="normal"
            // required
            fullWidth
            id="contact"
            label="Contact Number (with Country Code)"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box display="flex" justifyContent="center">
            <Typography variant="body1">Already have an account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none', marginLeft: 4 }}>
              <Typography variant="body1" color="primary">
                Log In
              </Typography>
            </Link>
            <CustomAlert1 alert={alert}/>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
