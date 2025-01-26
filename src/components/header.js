import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from "react";
import NavButton from '../layout/CustomNavButton';
import { useMyContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { alpha, Box } from '@mui/material';
import { darkmodecolor, HOMEROUTE, lightmodecolor, navigationTimer } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';
import CustomIcon from '../icons/CustomIcon';
import { ThemeContext } from '../Context/ThemeContext.js';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const { toggleTheme, mode } = useContext(ThemeContext);
    const { userName, isLoggedIn, updateLogin } = useMyContext();
    const { alert, showAlert } = useCustomAlert();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modecolor, setModeColor] = useState(mode == 'light' ? lightmodecolor : darkmodecolor);

    useEffect(() => {
        setModeColor(mode == 'light' ? lightmodecolor : darkmodecolor);
    }, [mode]);

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

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    height: '40px',
                    background: modecolor,
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingX: 2,
                        minHeight: '60px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'title.main',
                            fontWeight: 'bold',
                            transition: 'all 0.7s ease',
                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                            '&:hover': {
                                transform: 'scale(1.2)',
                                color: 'title.main',
                            },
                        }}
                    >
                        LC Coordinator
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            gap: { xs: 1, sm: 3 },
                            justifyItems: "center",
                            flexWrap: 'wrap',
                        }}
                    >
                        <NavButton label="Prepare" to="/" />
                        <NavButton label="Articles" to="/articles" />
                        <NavButton label="Resources" to="/resources" />
                        <NavButton label="About Me" to="/aboutme" />
                        {!isLoggedIn ? (
                            <>
                                <NavButton label="Login" to="/login" />
                                {/* <NavButton label="SignUp" to="/signup" /> */}
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
                        <Box marginTop={"1.2%"}>
                            <CustomIcon
                                name={mode}
                                sx={{
                                    cursor: 'pointer',
                                    fontSize: { xs: 18, sm: 20 },
                                    color: 'text.primary'
                                }}

                                onClick={toggleTheme}
                            />
                        </Box>
                    </Box>

                    <IconButton
                        sx={{ display: { xs: '¸', sm: 'none' }, color: 'text.primary' }}
                        onClick={() => toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                position="fixed"
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}

                sx={{
                    '& .MuiDrawer-paper': {
                        width: '250px',
                        paddingTop: '10px',
                        background: modecolor,
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        height: '35px',
                        borderBottom: (theme) => `1px solid ${alpha(theme.palette.title.main,0.2)}`,
                        flexDirection: 'column',
                        gap: 2,
                        paddingLeft: 7,
                        marginRight: 2, 
                        marginLeft: 2, 
                        marginBottom: '10px',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'title.main',
                            fontWeight: 'bold',
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        }}
                    >
                        LC Coordinator
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        paddingLeft: 2,
                    }}
                >
                    <NavButton label="Prepare" to="/" onClick={() => toggleDrawer(false)} />
                    <NavButton label="Articles" to="/articles" onClick={() => toggleDrawer(false)} />
                    <NavButton label="Resources" to="/resources" onClick={() => toggleDrawer(false)} />
                    <NavButton label="About Me" to="/aboutme" onClick={() => toggleDrawer(false)} />
                    {!isLoggedIn ? (
                        <>
                            <NavButton label="Login" to="/login" onClick={() => toggleDrawer(false)} />
                            {/* <NavButton label="SignUp" to="/signup" onClick={() => toggleDrawer(false)} /> */}
                        </>
                    ) : (
                        <>
                            <NavButton
                                label={userName}
                                to="/"
                                onClick={() => toggleDrawer(false)}
                                style={{ fontWeight: 'bold' }}
                            />
                            <NavButton
                                label="Sign Out"
                                onClick={
                                    () => {
                                        toggleDrawer(false);
                                        handleSignOut();
                                    }}
                            />
                        </>
                    )}
                    <CustomIcon
                        name={mode}
                        color={"text.primary"}
                        sx={{
                            marginLeft: '100px',
                            cursor: 'pointer',
                            fontSize: 20,
                        }}
                        onClick={
                            () => {
                                toggleDrawer(false);
                                toggleTheme();
                            }
                        }
                    />
                </Box>
            </Drawer>

            <CustomAlert1 alert={alert} />
        </>
    );
};

export default Header;
