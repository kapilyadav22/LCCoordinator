import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOMEROUTE, LOGINURL, navigationTimer } from '../constants/urlConstants';
import { useMyContext } from '../Context/ContextProvider';
import useCustomAlert from '../customHooks/customAlertHook';
import { LoginFormData } from '../dataFields/formData';
import CustomAlert1 from '../layout/CustomAlert1';
import CustomAvatar from '../layout/CustomAvatar';
import CustomTextField from '../layout/CustomTextField';
import { CustomTitle } from '../layout/CustomTitle';
import { validateFields } from '../utils/checkValidations';
import { postData } from '../utils/httpRequestUtils';
import SignIn from './Signinwithgoogle';

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

    if (res.status === 'success') {
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
      showAlert("error", res);
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
        <CustomTitle 
              title="Log In"
              variant="h5"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'title.main'}
            />
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
            color = 'inherit'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,color: 'white', backgroundColor:'title.main'}}
          >
            LogIn
          </Button>
        </Box>
      <Link to="/forgetpassword" sx={{ textDecoration: 'none', marginLeft: 4 }}>
          <CustomTitle 
              title="Forget Password"
              variant="body1"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'text.primary'}
            />
        </Link>
      </Box>
      <Box display="flex" alignItems="center" justifyContent={'center'} marginTop={4}>
      <CustomTitle 
              title="New User?"
              variant="body1"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'text.primary'}
            />
        <Link to="/signup" sx={{ textDecoration: 'none', marginLeft: 4 }}>
          <CustomTitle 
              title=" Sign Up"
              variant="body1"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'text.primary'}
            />
        </Link>
      </Box>
      <CustomTitle 
              title=" OR"
              variant="body1"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'text.primary'}
            />
      <SignIn />
    </Container>
  );
};

export default LoginPage;