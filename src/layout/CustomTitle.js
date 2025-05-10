import { Grid, Typography } from "@mui/material"

export const CustomTitle = ({
    title,
    variant = "h5",
    fontWeight = 'bold',
    fontSize = '1.5rem',
    color = 'title.main',
    textAlign = 'center',
    textTransform = 'uppercase',
    letterSpacing = '0.1rem',
    lineHeight = 1.5,
    marginTop = "1%",
    marginBottom = "1%",
    xs = 12,
    md = 6,
    justifyContent = "center"
}) => {

    return (
        <Grid 
            item 
            xs={xs} 
            md={md} 
            display="flex" 
            justifyContent={justifyContent}
            marginTop={marginTop}
            marginBottom={marginBottom}
        >
            <Typography 
                variant={variant}
                sx={{
                    fontWeight,       
                    fontSize,         
                    color,    
                    textAlign,     
                    textTransform, 
                    letterSpacing,  
                    lineHeight,          
                }}
            >
                {title}
            </Typography>
        </Grid>
    )
}

