import { Grid, Typography } from "@mui/material"

export const CustomTitle = ({title}) =>{

    return (
        <Grid item xs={12} md={6} display="flex" justifyContent="center" marginTop={"1%"} marginBottom={"1%"}>
                <Typography 
                    variant="h5"
                    sx={{
                    fontWeight: 'bold',       
                    fontSize: '2rem',         
                    color: 'primary.main',    
                    textAlign: 'center',     
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1rem',  
                    lineHeight: 1.5,          
                    }}
                >
                 {title}
                </Typography>
            </Grid>
    )
}