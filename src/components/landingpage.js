import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import CardsContainer from '../layout/CardsContainer';
import { Breadcrumb } from '../layout/Breadcrumb';
import { PAGES_NAME } from '../config';
import { Fade, Slide } from '@mui/material';

function LandingPage() {
    const theme = useTheme();

    return (
        <>
            <Container maxWidth="xl" sx={{padding: "2px"}}>
                {/* <Breadcrumb pageName={PAGES_NAME.HOMEPAGE}></Breadcrumb> */}
                <Grid container spacing={1} sx={{ mt: 3, mb: 1, alignContent: 'center', justifyContent:'center' }}>
                    <Grid>
                                <Typography
                                    variant="h1"
                                    component="span"
                                    sx={{
                                        color: 'primary.main', 
                                        fontWeight: 'bold',
                                    }}
                                >
                                    LC Coordinator
                                </Typography>
                        
                        <Fade in={true} timeout={1500}>
                            <Typography variant="h5" component="h1" gutterBottom align="center">
                                One Stop Solution To Programming
                            </Typography>
                        </Fade>
                    </Grid>
                </Grid>
                
                {/* <Slide direction="right" in={true} timeout={1000}> */}
                    <Grid>
                    <CardsContainer />
                    </Grid>
                {/* </Slide> */}
            </Container>
        </>
    );
}

export default LandingPage;
