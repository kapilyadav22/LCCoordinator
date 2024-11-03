import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react"
import NavButton from '../utils/navButton';

const Header = () => {
    return (<>
          <AppBar position="static" sx={{ height: '50px', alignItems: 'top' }}>
          <Toolbar sx={{ height: '20px' }}> 
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                            LC Coordinator
                        </Typography>
                        <NavButton label="Home" to="/" />
                        <NavButton label="Blogs" to="/blogs" />
                        <NavButton label="About" to="/aboutus" />
                        <NavButton label="Contact" to="/contact" />
                        <NavButton label="Login" to="/login" />
                        <NavButton label="SignUp" to="/signup" />
                    </Toolbar>
                </AppBar>
                </>)
}

export default Header;