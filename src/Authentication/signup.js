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
import { SERVERURL } from '../constants/urlConstants';
import { checkSignUpValidations, validateFields } from '../utils/checkValidations';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUpDetails = async (data) => {
    const res = await postData(SERVERURL + '/register',data);
    if(res.success){
      navigate('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const error = validateFields('signup', email, password, name);
    if (error) {
      setError(error);
      return;
    }
    handleSignUpDetails({name,email,password});

    setName('');
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
      
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
