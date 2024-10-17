import React from "react";
import iconsMap from "./muiicons";

const CustomIcon = (props) =>{
    const Icon =  iconsMap.has(props.name)?iconsMap.get(props.name):iconsMap.get("default");
    const customStyle = props.sx?props.sx:{}
    const color = props.color?props.color:'black';
    
    return (
        <Icon
        onClick={props.onClick} 
        sx={{ fontSize: 14,...customStyle, stroke: '#ffffff', strokeWidth: 0.5}}
        color={color || 'black'}
        aria-label = {props.arialabel || ''}
        />
    )
}
export default CustomIcon;