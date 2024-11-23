import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import useTheme from '@mui/material/styles/useTheme';
import SimpleSlider from '../layout/CardsContainer';
import { Breadcrumb } from '../layout/Breadcrumb';
import { PAGES_NAME } from '../config';

function LandingPage() {
    const theme = useTheme();

    return (
        <>
                <Container maxWidth="lg">
                {/* <Breadcrumb pageName={PAGES_NAME.HOMEPAGE}></Breadcrumb> */}
                    <Grid container spacing={1} sx={{ mt: 9, mb: 1, alignContent: 'center', justifyContent:'center' }}>
                        
                        <Grid>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Welcome to LC Coordinator
                            </Typography>
                            <Typography variant="h5" component="h1" gutterBottom  align="center"> 
                                One Stop Solution To Programming
                            </Typography>
                            
                        </Grid>
                    </Grid>
                    <SimpleSlider></SimpleSlider>
                </Container>
               
          
        </>
    )
}

export default LandingPage;