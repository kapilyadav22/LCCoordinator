import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react";
import NavButton from '../layout/CustomNavButton';
import { useMyContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { HOMEROUTE, navigationTimer } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';

const Header = () => {
    const { userName, isLoggedIn, updateLogin } = useMyContext();
    const { alert, showAlert } = useCustomAlert();
    const navigate = useNavigate();

    const handleSignOut = () => {
        showAlert("success", "User SignOut Successfully");
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem('activeTab');
        
        setTimeout(() => {
            updateLogin(false);
            navigate(HOMEROUTE);
        }, navigationTimer);
    };

    return (
        <>
            <AppBar 
                position="static" 
                sx={{
                    height: '40px', 
                    bgcolor: (theme) => theme.palette.appbar.main,
                    display: 'flex', 
                    justifyContent: 'center',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        paddingX: 2,
                        minHeight: '60px',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute', 
                            left: 20,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bold',
                            '&:hover': {
                                color: (theme) => theme.palette.primary.light,
                            },
                        }}
                    >
                        LC Coordinator
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyItems:"center" }}>
                        <NavButton label="Home" to="/aboutme" />
                        <NavButton label="Prepare" to="/" />
                        <NavButton label="Articles" to="/blogs" />
                        <NavButton label="Resources" to="/resources" />
                        <NavButton label="Contact" to="/contact" />
                        {!isLoggedIn ? (
                            <>
                                <NavButton label="Login" to="/login" />
                                <NavButton label="SignUp" to="/signup" />
                            </>
                        ) : (
                            <>
                                <NavButton 
                                    label={userName} 
                                    to="/" 
                                    style={{ fontWeight: 'bold' }} 
                                />
                                <NavButton 
                                    label="Sign Out" 
                                    onClick={handleSignOut} 
                                />
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <CustomAlert1 alert={alert} />
        </>
    );
};

export default Header;
