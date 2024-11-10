import React from 'react';
import  Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavButton = ({ label, to, style={} }) => {

  return (
    <Button color='inherit'
    sx = {style}
    // sx = {{color: (theme) => theme.palette.text.secondary} }
    component={Link} to={to}>
      {label}
    </Button>
  );
};

export default NavButton;
