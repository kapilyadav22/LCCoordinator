import ProfilePic from '../assets/icons/about.png';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import SocialMediaBar from '../utils/SocialMediaBar';
import { Divider } from '@mui/material';

const AboutPage = () => {
  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{ mt: 5, mb: 2 }}>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={9} sx={{ p: { xs: 2, md: 4 } }}>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.secondary' }}>
      About Me
    </Typography>

    <Divider sx={{ mb: 3, bgcolor: 'primary.light' }} />

    <Box sx={{ mb: 3 }}>
    
      <Typography variant="body1" color="text.primary">
      👨 Hi, My Name is Kapil Yadav. I am currently working as an R&D Engineer at Tejas Networks.
      </Typography>
    </Box>

    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" color="text.primary">
        🎓 I have a Master's degree in Artificial Intelligence from Delhi Technological University (formerly DCE).
      </Typography>
    </Box>

    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" color="text.primary">
        🌱 I am passionate about problem-solving and currently work as a Full Stack Engineer with knowledge in JavaScript, ReactJS, Java, MySQL, and more.
      </Typography>
    </Box>

    <Box sx={{ mb: 8 }}>
      <Typography variant="body1" color="text.primary">
      💻 In my free time, I enjoy learning new technologies and working on personal projects. I believe in continuous improvement and always strive to enhance my skills.
      </Typography>
    </Box>

    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
      Feel free to connect with me!
    </Typography>
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
