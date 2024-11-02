import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import { checkLoginValidations, validateFields } from '../utils/checkValidations';
import { Link, useNavigate } from 'react-router-dom';
import SignIn from './signinwithgoogle';
import { postData } from '../utils/httpRequestUtils';
import { SERVERURL } from '../constants/urlConstants';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginDetails = async (data) => {
    const res = await postData(SERVERURL + '/auth/login',data);
    if(res.success){
      navigate('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const error = validateFields('login', email, password);
    if (error) {
      setError(error);
      return;
    }
    handleLoginDetails({email,password});
    
    setEmail('');
    setPassword('');
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
          
      </Box>
      <Box display="flex" alignItems="center" justifyContent={'center'}>
        <Typography variant="body1">New User?</Typography>
        <Link to="/signup" style={{ textDecoration: 'none', marginLeft: 4 }}>
          <Typography variant="body1" color="primary">
            Sign Up
          </Typography>
        </Link>
      </Box>
      <Typography align= "center" variant="body1" color="black" sx={{margin: '10%'}}>
            OR
          </Typography>
      <SignIn/>
    </Container>
  );
};

export default LoginPage;