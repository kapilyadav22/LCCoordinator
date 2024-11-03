import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { socialMediaData } from '../constants/urlConstants';

const SocialMediaBar = () => {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {socialMediaData.map((link, index) => (
        <Grid item key={index}>
          <IconButton
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default SocialMediaBar;
