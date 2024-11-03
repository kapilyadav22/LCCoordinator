import React from 'react';
import  Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavButton = ({ label, to }) => {
  return (
    <Button color="inherit" component={Link} to={to}>
      {label}
    </Button>
  );
};

export default NavButton;
