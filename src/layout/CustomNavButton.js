import React, { useEffect } from 'react';
import  Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavButton = ({ label, to, style={}, onClick }) => {
  
  const handleButtonClick = () => {
    localStorage.removeItem('activeTab');
    if (onClick) onClick();
  };

  return (
    <Button color='inherit'
    onClick={handleButtonClick} 
    sx = {{
      flexGrow: 1,
      textTransform:"none", 
      fontSize: "16px",
      textDecoration: 'none',
      transition: 'all 0.5s ease',
      "&:hover": {color: (theme) => theme.palette.primary.light,
        transform: 'scale(1.3)',
                },}}
    // sx = {{color: (theme) => theme.palette.text.secondary} }
    component={Link} to={to}>
      {label}
    </Button>
  );
};

export default NavButton;
