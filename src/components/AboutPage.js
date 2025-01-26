import { Avatar, Box, Container, Divider, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext.js';
import ProfilePic from '../assets/icons/about.png';
import { darkmodecolor, lightmodecolor } from '../constants/urlConstants.js';

const AboutPage = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        minHeight: "550px",
        py: { xs: 3, sm: 5 }, 
        background: mode === 'light' ? lightmodecolor : darkmodecolor,
        borderRadius: '16px',
        boxShadow: 3,
        px: { xs: 2, sm: 3 }, 
      }}
    >
      <Box sx={{ mt: { xs: 3, sm: 5 }, mb: { xs: 2, sm: 5 } }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{ flexDirection: { xs: 'column', md: 'row' }, textAlign: { xs: 'center', md: 'left' } }}
        >
          {/* Left Content Section */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  fontFamily: 'Poppins, sans-serif',
                  letterSpacing: '1px',
                  fontSize: { xs: '1.8rem', sm: '2.5rem' }, 
                }}
                gutterBottom
              >
                About Me
              </Typography>
              <Divider sx={{ mb: { xs: 2, sm: 3 }, bgcolor: 'primary.light' }} />

              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: { xs: '1rem', sm: '1.15rem' }, 
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                >
                  Hi, My Name is Kapil Yadav. I am currently working as an R&D Engineer at Tejas Networks.
                </Typography>
              </Box>

              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: { xs: '1rem', sm: '1.15rem' }, 
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                >
                  I have a Master's degree in Artificial Intelligence from Delhi Technological University (formerly DCE).
                </Typography>
              </Box>

              <Box sx={{ mb: { xs: 5, sm: 8 } }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: { xs: '1rem', sm: '1.15rem' }, 
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                >
                  In my free time, I enjoy learning new technologies and working on personal projects. I believe in continuous improvement and always strive to enhance my skills.
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: { xs: '1.1rem', sm: '1.15rem' }, 
                }}
              >
                Feel free to connect with me!
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Avatar
                alt="Profile Picture"
                src={ProfilePic}
                sx={{
                  width: { xs: 180, sm: 220, md: 300, lg: 320 }, 
                  height: { xs: 180, sm: 220, md: 300, lg: 320 }, 
                  margin: '0 auto',
                  borderRadius: '50%',
                  boxShadow: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 10,
                  },
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
