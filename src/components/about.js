import ProfilePic from '../assets/icons/about.png';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import SocialMediaBar from '../utils/SocialMediaBar';

const AboutPage = () => {
  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{ mt: 5, mb: 2 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={9}>
            {/* <Typography variant="h4" gutterBottom>
              About Me
            </Typography> */}
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              Kapil Yadav
            </Typography>
            <Typography variant="body1" paragraph>
              I'm a passionate Software Engineer with experience in building web applications using modern technologies.
              I love solving problems.
            </Typography>
            <Typography variant="body1" paragraph>
              In my free time, I enjoy learning new technologies, working on personal projects.
              I believe in continuous improvement and always strive to enhance my skills.
            </Typography>
            <Typography variant="body" gutterBottom sx={{ fontWeight: 'bold' }}>
              Feel free to connect with me!
            </Typography>

            {/* <SocialMediaBar /> */}
          </Grid>
          <Grid item>
            <Avatar
              alt="Profile Picture"
              src={ProfilePic}
              sx={{ width: 340, height: 300, margin: '0 auto', borderRadius: '50px',}} 
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
