import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react";
import NavButton from '../layout/CustomNavButton';
import { useMyContext } from '../Context/ContextProvider';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { HOMEROUTE, navigationTimer } from '../constants/urlConstants';
import CustomAlert from '../layout/CustomAlert';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';


const Header = () => {
    const { userName, isLoggedIn, updateLogin  } = useMyContext();
    const { alert, showAlert } = useCustomAlert();
    const navigate = useNavigate();

    const handleSignOut = () => {
        showAlert("success", "User SignOut Successfully");
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        
        setTimeout(() => {
            updateLogin(false);
            navigate(HOMEROUTE);
          }, navigationTimer);
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
                    <NavButton label="Sign Out" onClick={()=>handleSignOut()}/>
                    <CustomAlert1 alert={alert} />
                  </>
                )
                }
            </Toolbar>
        </AppBar>
    </>)
}

export default Header;