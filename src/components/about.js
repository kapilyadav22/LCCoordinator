import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
} from '@mui/material';

const AboutPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          We are a team of passionate individuals committed to delivering the best service possible. Our mission is to provide exceptional value to our customers through innovative solutions and outstanding support.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team consists of experienced professionals from diverse backgrounds, dedicated to making a positive impact in the industry. We believe in collaboration, integrity, and continuous improvement.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Avatar
              alt="Team Member 1"
              src="https://via.placeholder.com/100"
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="body2">John Doe</Typography>
            <Typography variant="caption">CEO</Typography>
          </Grid>
          <Grid item>
            <Avatar
              alt="Team Member 2"
              src="https://via.placeholder.com/100"
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="body2">Jane Smith</Typography>
            <Typography variant="caption">CTO</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
