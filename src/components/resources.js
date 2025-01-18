import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/httpRequestUtils';
import { BLOGSURL, SERVERURL } from '../constants/urlConstants';
import ListView from '../layout/CustomListView';
import { resourcesData } from '../dataFields/resourcesData';
import { CustomTitle } from '../layout/CustomTitle';
import CustomIcon from '../icons/CustomIcon';
import CustomAccordion from '../layout/CustomAccordion';

const Resources = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const handleResourcesClick = (item) => {
        if (item.link) {
            window.open(item.link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Container sx={{ minHeight: "550px", minWidth: "100%" }}>
            <CustomTitle title={"Resources"} />

            {resourcesData.map((category, index) => (
                      <CustomAccordion
                      index = {index}
                      category={category.title} 
                      content={category.items} 
                      handleClick={handleResourcesClick}/>
            ))}
        </Container>
    );
};

export default Resources;
