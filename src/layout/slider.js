import React, { useState } from 'react';
import { cardData } from '../data/carddata';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../config/routeconfig';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const SimpleSlider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleCardClick = (title) => {
    const currentPage = RouteConfig.find(item => title===item.pageName);
    const url  = currentPage?.path;
    navigate(url);
  };


  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {cardData.map((card, index) => (
          <Tab
            key={index}
            label={
              <Card  onClick={() => handleCardClick(card.title)}>
                <CardMedia
                  component="img"
                  height="200"
                  width = "100"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.content}
                  </Typography>
                </CardContent>
              </Card>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default SimpleSlider;