import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { RouteConfig } from "../config/RouteConfig";
import CustomIcon from "../icons/CustomIcon";

export const Breadcrumb = (props) =>{
    // const navigate = useNavigation();
    const currentPage = RouteConfig.find(item => props.pageName===item.pageName);
    
    const ParentBreadCrumb = () => {
        if(currentPage?.parent?.length){
            const parentArr = currentPage.parent.map((parentItem => parentItem.parentName));
            const pathArr = new Array(parentArr.length);

            let pathItemCount = 0;
            for(let index=0;index<RouteConfig.length;index++){
                const parentObject = RouteConfig[index];
                for(let j=0;j<parentArr.length;j++){
                    if(parentArr[j]===parentObject.pageName){
                        pathArr[j]=parentObject;
                        pathItemCount++;
                    }
                    if(pathItemCount===parentArr.length){
                        break;
                    }
                }
            }
            return pathArr;
        }
        return [];
    }

    return (
        <Breadcrumbs separator={<CustomIcon name='forwardArrow'/>} aria-label="breadcrumb">
        <CustomIcon name='home' sx = {{fontSize : 20}}></CustomIcon>
            { ParentBreadCrumb().map(item =>(
                <Link key={item.path} to={item.path}>
                    {item.pageName}
                </Link>
            ))
            }
               <Link to={`${currentPage?.pageName}`}>{props.pageName}</Link>

        </Breadcrumbs>
    )
}