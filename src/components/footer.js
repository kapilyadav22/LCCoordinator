import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography/Typography"
import React from "react";

const Footer = () => {
    return (
        <>
            <Container maxWidth={false} component="footer" sx={{ bgcolor: 'background.paper', mt: 8, py: 6 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Kapil Yadav. All rights reserved.
                </Typography>
            </Container>
        </>)
}
export default Footer;