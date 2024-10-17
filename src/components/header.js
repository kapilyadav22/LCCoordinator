import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react"
import NavButton from '../utils/navButton';

const Header = () => {
    return (<>
          <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            ProgrammingHub
                        </Typography>
                        <NavButton label="Home" to="/" />
                        <NavButton label="About" to="/aboutus" />
                        <NavButton label="Contact" to="/contact" />
                        <NavButton label="Login" to="/login" />
                        <NavButton label="SignUp" to="/signup" />
                    </Toolbar>
                </AppBar>
                </>)
}

export default Header;