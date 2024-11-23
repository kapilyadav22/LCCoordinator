import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react";
import NavButton from '../utils/navButton';
import { useMyContext } from '../Context/globalContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { HOMEROUTE } from '../constants/urlConstants';
import CustomAlert from '../layout/customAlerts';


const Header = () => {
    const { userName, isLoggedIn, showAlert, updateLogin  } = useMyContext();
    const navigate = useNavigate();

    const handleSignOut = () => {
        showAlert("success", "User SignOut Successfully");
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('userData');
        showAlert("success", "User SignOut Successfully");
        updateLogin(false);
        navigate(HOMEROUTE);
    };

    return (<>
        <AppBar position="static" sx={{ height: '49px', alignItems: 'top', bgcolor: (theme) => theme.palette.appbar.main }}>
            <Toolbar sx={{ height: '20px' }}>
                <Typography 
                variant="h8" 
                component="a"
                href="/"
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                >
                LC Coordinator
                </Typography>
                <NavButton label="Home" to="/aboutme" />
                <NavButton label="Prepare" to="/" />
                <NavButton label="Blogs" to="/blogs" />
                <NavButton label="Resources" to="/resources" />
                <NavButton label="Contact" to="/contact" />
                {!isLoggedIn && (
                    <>
                      <NavButton label="Login" to="/login" />
                      <NavButton label="SignUp" to="/signup" />
                    </>
                )
                }
                {isLoggedIn && (
                    <>
                    <NavButton label={userName} to="/" style={{ fontWeight: 'bold' }}/>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                    <CustomAlert></CustomAlert>
                  </>
                )
                }
            </Toolbar>
        </AppBar>
    </>)
}

export default Header;