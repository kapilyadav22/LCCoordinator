import React, { useState } from 'react';
import { Tabs, Tab, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { cardData } from '../data/carddata';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../config/routeconfig';

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
    //  navigate('/lc150');
  };


  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        // sx={{
        //   '& .MuiTabs-scroller': {
        //     overflowX: 'auto !important',
        //     '::-webkit-scrollbar': { display: 'none' },
        //     scrollbarWidth: 'none',
        //   },
        // } }
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