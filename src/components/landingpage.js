import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import CardsContainer from '../layout/CardsContainer';
import { Fade } from '@mui/material';

function LandingPage() {
    const theme = useTheme();

    return (
        <>
            <Container maxWidth="xl" sx={{ padding: "2px" }}>
                {/* <Breadcrumb pageName={PAGES_NAME.HOMEPAGE}></Breadcrumb> */}
                <Grid container spacing={1} sx={{ mt: 3, mb: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h1"
                            sx={{
                                color: 'title.main',
                                fontWeight: 'bold',
                                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                                textAlign: 'center',
                            }}
                        >
                            LC Coordinator
                        </Typography>

                        <Fade in={true} timeout={1500}>
                            <Typography 
                                variant="h5" 
                                component="h1" 
                                gutterBottom 
                                align="center"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                    color: 'text.primary',
                                }}
                            >
                                ReDefine The way We Learn
                            </Typography>
                        </Fade>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" sx={{ mt: 3 }}>
                    <CardsContainer />
                </Grid>
            </Container>
        </>
    );
}

export default LandingPage;
