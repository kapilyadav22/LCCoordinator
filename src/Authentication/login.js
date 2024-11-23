import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import { validateFields } from '../utils/checkValidations';
import { Link, useNavigate } from 'react-router-dom';
import SignIn from './signinwithgoogle';
import { postData } from '../utils/httpRequestUtils';
import { HOMEROUTE, LOGINURL } from '../constants/urlConstants';
import CustomAvatar from '../layout/customavatar';
import { LoginFormData } from '../dataFields/formData';
import { useMyContext } from '../Context/globalContext';
import CustomAlert from '../layout/customAlerts';

const LoginPage = () => {
  const [formData, setFormData] = useState(LoginFormData);
  const [error, setError] = useState('');
  
  const { updateUserName, updateLogin, showAlert } = useMyContext();

  const navigate = useNavigate();

  const handleLoginDetails = async (data) => {
    const res = await postData(LOGINURL, data);
    if (res.success) {
      updateUserName("kapil");
      updateLogin(true);
      navigate(HOMEROUTE);
    } else {
      showAlert("error", "Please try again");
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
    const error = validateFields('login', formData.email, formData.password);
    if (error) {
      setError(error);
      return;
    }
    handleLoginDetails(formData);
    setFormData(LoginFormData);
    setError('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            LogIn
          </Button>
        </Box>

      </Box>
      <Box display="flex" alignItems="center" justifyContent={'center'}>
        <Typography variant="body1">New User?</Typography>
        <Link to="/signup" sx={{ textDecoration: 'none', marginLeft: 4 }}>
          <Typography variant="body1" color="primary">
            Sign Up
          </Typography>
        </Link>
      </Box>
      <Typography align="center" variant="body1" color="black" sx={{ margin: '3%' }}>
        OR
      </Typography>
      <SignIn />
       <CustomAlert />
    </Container>
  );
};

export default LoginPage;