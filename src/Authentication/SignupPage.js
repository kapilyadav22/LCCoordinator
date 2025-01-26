import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOMEROUTE, navigationTimer, REGISTERURL } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';
import { SignUpFormData } from '../dataFields/formData';
import CustomAlert1 from '../layout/CustomAlert1';
import CustomAvatar from '../layout/CustomAvatar';
import CustomButton from '../layout/CustomButton';
import CustomTextField from '../layout/CustomTextField';
import { CustomTitle } from '../layout/CustomTitle';
import { validateFields } from '../utils/checkValidations';
import { postData } from '../utils/httpRequestUtils';

const SignupPage = () => {
  const [formData, setFormData] = useState(SignUpFormData);
  const [error, setError] = useState('');
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const handleSignUpDetails = async (data) => {
    const res = await postData(REGISTERURL, data);
    if (res.status === "success") {
      showAlert("success", "SignUp Successfully, Please Verify the Email using Verification Link");
      setTimeout(() => {
        navigate(HOMEROUTE);
        setFormData(SignUpFormData);
        setError('');
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

        <CustomAvatar />
        <CustomTitle 
              title=" Sign Up"
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
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
        <CustomButton> SignUp</CustomButton>
          <Box display="flex" justifyContent="center">
            <CustomTitle 
              title="Already have an account?"
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
            <Link to="/login" style={{ textDecoration: 'none', marginLeft: 4 }}>
            <CustomTitle 
              title="Log In"
              variant="body1"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'title.main'}
            />
            </Link>
            <CustomAlert1 alert={alert} />
          </Box>
         
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
