import React, { useEffect, useState } from 'react';
import { cardData } from '../dataFields/carddata';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../config/RouteConfig';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const CardsContainer = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setValue(Number(savedTab)); 
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('activeTab', newValue); 
  };

  const handleCardClick = (title) => {
    const currentPage = RouteConfig.find(item => title===item.pageName);
    const url  = currentPage?.path;
    navigate(url);
  };


  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper', padding: "2px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTabs-scrollButtons': {
            margin: "20px",
            width: '30px',
            // '&.Mui-disabled': {
            //   opacity: 0.2, 
            // },
            '& .css-18w7uxr-MuiSvgIcon-root' :
             {
            
              padding: '5px', 
              width: '3em', 
              height: '3em', 
            },
          },
        }}
      >
        {cardData.map((card, index) => (
          <Tab
            key={index}
            sx = {{
              transition: 'all 0.5s ease',
                '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.08)'
            }}}
            label={
              <Card  
              onClick={() => handleCardClick(card.title)}
              
              >
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

export default CardsContainer;