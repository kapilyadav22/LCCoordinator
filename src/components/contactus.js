import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';

import Grid from '@mui/material/Grid2';

const ContactUsPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We would love to hear from you! Please fill out the form below or reach us at our contact details.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={1} justifyContent = "center" >
          <Grid size={8}> 
            <TextField
              required
              fullWidth
              label="Your Name"
              variant="outlined"
            />
          </Grid>
          <Grid size={8}>
            <TextField
              required
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid size={8}>
            <TextField
              required
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
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
        <Typography variant="body1">Phone: (+91) xxxxxxxxxx</Typography>
      </Box>
    </Container>
  );
};

export default ContactUsPage;
