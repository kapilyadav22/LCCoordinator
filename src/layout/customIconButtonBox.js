import Box from "@mui/material/Box";
import React from "react";
import CustomIcon from "../icons/CustomIcon";

const CustomIconButtonBox = (props) =>{
    
    const {iconName, onClick, sx, arialabel} = props;
    return (
        <Box sx={{
            height: '35px',
            width: '35px',
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
            borderRadius: '5px',
            margin: '10px',
            border: '1px solid #9e9e9e',
        }}
        >
        <CustomIcon
            name={iconName}
            color="primary"
            onClick={onClick}
            arialabel={arialabel}
            sx={sx}
        />
        </Box>

    )
}
export default CustomIconButtonBox;