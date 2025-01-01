import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import { validateFields } from '../utils/checkValidations';
import { Link, useNavigate } from 'react-router-dom';
import SignIn from './Signinwithgoogle';
import { postData } from '../utils/httpRequestUtils';
import { HOMEROUTE, LOGINURL, navigationTimer } from '../constants/urlConstants';
import CustomAvatar from '../layout/CustomAvatar';
import { LoginFormData } from '../dataFields/formData';
import { useMyContext } from '../Context/ContextProvider';
import CustomAlert from '../layout/CustomAlert';
import CustomAlert1 from '../layout/CustomAlert1';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomTextField from '../layout/CustomTextField';

const LoginPage = () => {
  const [formData, setFormData] = useState(LoginFormData);
  const [error, setError] = useState('');

  const { updateUserName, updateLogin, updateAdminStatus } = useMyContext();
  const { alert, showAlert } = useCustomAlert();

  const navigate = useNavigate();

  const handleLoginDetails = async (data) => {
    const res = await postData(LOGINURL, data);
    const name = res?.data?.name != null ? res?.data?.name : "Alien";
    const role = res?.data?.role != null ? res.data.role : "User";

    if (res.success) {
      showAlert("success", "Login Successfull");
      updateAdminStatus(role);
      updateUserName(name);
      updateLogin(true);

      setTimeout(() => {
        setFormData(LoginFormData);
        setError('');
        navigate(HOMEROUTE);
      }, navigationTimer);
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

  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <CustomTextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <CustomTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
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

    </Container>
  );
};

export default LoginPage;