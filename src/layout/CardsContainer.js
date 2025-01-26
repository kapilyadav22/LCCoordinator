import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../config/RouteConfig';
import { darkGradient, lightGradient } from '../constants/urlConstants';
import { ThemeContext } from '../Context/ThemeContext.js';
import { cardData } from '../dataFields/carddata';

const CardsContainer = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setValue(Number(savedTab));
    }
  }, []);

  const handleCardClick = (title) => {
    const currentPage = RouteConfig.find(item => title === item.pageName);
    const url = currentPage?.path;
    navigate(url);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: { xs: '16px', sm: '24px' },
        background: mode === 'light' ? lightGradient : darkGradient,
        borderRadius: '20px',
        border: (theme) => `1px solid ${alpha(theme.palette.title.main,0.4)}`,
        height: { xs: 'calc(100vh - 100px)', sm: 'auto' }, 
        overflowY: { xs: 'auto', sm: 'hidden' }, 
        overflowX: { xs: 'hidden', sm: 'auto' }, 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: { xs: '16px', sm: '24px' },
          padding: '4px',
          minWidth: 'fit-content', 
        }}
      >
        {cardData.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(card.title)}
            sx={{
              borderRadius: '20px',
              width: { xs: '100%', sm: '300px' }, 
              minWidth: { xs: '100%', sm: '300px' },
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
              flex: { xs: '0 0 auto', sm: '0 0 300px' },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={card.image}
              alt={card.title}
              sx={{
                objectFit: 'cover',
                borderRadius: '20px 20px 0 0',
              }}
            />
            <CardContent sx={{ padding: '16px', flexGrow: 1, justifyItems:'center' }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="text.primary"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.2rem' },
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '1rem', sm: '0.9rem' },
                }}
              >
                {card.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CardsContainer;