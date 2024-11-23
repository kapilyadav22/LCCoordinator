import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CustomIcon from '../icons/customicon';
import { useNavigate } from 'react-router-dom';
import { SocialMediaLinks } from '../constants/urlConstants';

const SocialMediaBar = () => {

  const handleButtonClick = (link)  => {
    window.open(link, '_blank', 'noopener noreferrer');
  }

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      { Object.keys(SocialMediaLinks).map((key) => (
        <Grid item key={key}>
        <CustomIcon name = {key} sx= {{fontSize: 40 }} onClick={()=> handleButtonClick(SocialMediaLinks[key])}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default SocialMediaBar;
