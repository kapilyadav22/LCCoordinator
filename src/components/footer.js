import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography/Typography"
import React from "react";
import SocialMediaBar from "../layout/SocialMediaBar";

const Footer = () => {
    return (
        <>
            <Container maxWidth={false} component="footer" sx={{ bgcolor: 'background.paper', mt: 1, py: 1 }}>
            <SocialMediaBar/>
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Kapil Yadav. All rights reserved.
                </Typography>
            </Container>
        </>)
}
export default Footer;