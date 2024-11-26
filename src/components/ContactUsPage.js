import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { contactFormData } from '../dataFields/formData';
import { SENDEMAIL, SERVERURL } from '../constants/urlConstants';
import { postData } from '../utils/httpRequestUtils';
import { CustomTitle } from '../layout/CustomTitle';

const ContactUsPage = () => {
  const [formData, setFormData] = useState(contactFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await postData(SENDEMAIL,formData);
    if(res.success){
      console.log("success", formData);
    }

  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center'}}>
        <CustomTitle title = {"Contact Us"}/>
        <Typography variant="body1" paragraph>
          We would love to hear from you! Please Help us grow and share your Valuable FeedBack and Suggestions.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={1} justifyContent = "center" >
          <Grid size={8}> 
            <TextField
              required
              fullWidth
              name="name" 
              label="Your Name"
              value={formData.name}
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid size={8}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              value={formData.email}
              variant="outlined"
              type="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid size={8}>
            <TextField
              required
              fullWidth
              name="message" 
              label="Message"
              value={formData.message}
              variant="outlined"
              multiline
              rows={4}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={8}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ mt: 4, justifyItems:'center' }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1">Email: singhkapil347@gmail.com</Typography>
      </Box>
    </Container>
  );
};

export default ContactUsPage;
