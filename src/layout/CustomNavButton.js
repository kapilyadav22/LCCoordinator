import React from 'react';
import  Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavButton = ({ label, to, style={}, onClick }) => {

  return (
    <Button color='inherit'
    sx = {style}
    onClick = {onClick}
    // sx = {{color: (theme) => theme.palette.text.secondary} }
    component={Link} to={to}>
      {label}
    </Button>
  );
};

export default NavButton;
