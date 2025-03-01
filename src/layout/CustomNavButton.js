import Button from '@mui/material/Button';
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
      color: 'title.main',
      "&:hover": {color: 'title.main',
        transform: 'scale(1.3)',
                },}}
    component={Link} to={to}>
      {label}
    </Button>
  );
};

export default NavButton;
