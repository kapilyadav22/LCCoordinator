import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography/Typography"
import React from "react";
import SocialMediaBar from "../layout/SocialMediaBar";

const Footer = () => {
    return (
        <>
            <Container maxWidth={false} component="footer" 
            sx={{ bgcolor: 'background.paper',
             paddingTop: '0%', 
             paddingBottom: '0%'
             }}>
            <SocialMediaBar/>
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} LC Coordinator. All rights reserved.
                </Typography>
            </Container>
        </>)
}
export default Footer;