import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useTheme, ThemeProvider} from '@mui/material/styles';
import SimpleSlider from '../layout/slider';
import Grid from '@mui/material/Grid2';
// import { Breadcrumb } from '../utils/breadcrumbs';
import { PAGES_NAME } from '../config';
// import { useNavigate } from 'react-router-dom';

function Landingpage() {
    // const navigate = useNavigate();
    const theme = useTheme();

    return (
        <>
        
                <Container maxWidth="lg">
                    <Grid container spacing={1} sx={{ mt: 4, mb: 4, alignContent: 'center', justifyContent:'center' }}>
                        
                        <Grid 
                        // item xs={12} md={12} 
                        >
                            <Typography variant="h2" component="h1" gutterBottom>
                                Welcome to LC Coordinator
                            </Typography>
                            <Typography variant="h5" >
                                One Stop Solution To Programming
                            </Typography>
                            
                        </Grid>
                    </Grid>

                    {/* <Breadcrumb pageName={PAGES_NAME.HOMEPAGE}></Breadcrumb> */}

                    <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mt: 8, mb: 4 }}>
                        DSA Sheets
                    </Typography>
                    <SimpleSlider></SimpleSlider>
                </Container>
               
          
        </>
    )
}

export default Landingpage;