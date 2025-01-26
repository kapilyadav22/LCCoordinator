import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography/Typography"
import React, { useContext } from "react";
import SocialMediaBar from "../layout/SocialMediaBar";
import { ThemeContext } from "../Context/ThemeContext.js";
import { darkmodecolor, lightmodecolor } from "../constants/urlConstants.js";

const Footer = () => {
      const { mode } = useContext(ThemeContext);

    return (
        <>
            <Container maxWidth={false} component="footer" 
            
            sx={{ 
            background : mode === 'light' ? lightmodecolor : darkmodecolor,
             paddingTop: '0%', 
             paddingBottom: '0%'
             }}>
            <SocialMediaBar/>
                <Typography variant="body2" color="title.main" align="center">
                    © {new Date().getFullYear()} LC Coordinator. All rights reserved.
                </Typography>
            </Container>
        </>)
}
export default Footer;