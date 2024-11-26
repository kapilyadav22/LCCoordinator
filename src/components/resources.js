import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/httpRequestUtils';
import { BLOGSURL, SERVERURL } from '../constants/urlConstants';
import ListView from '../layout/CustomListView';
import { resourcesData } from '../dataFields/resourcesData';
import { CustomTitle } from '../layout/CustomTitle';

const Resources = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const handleResourcesClick = (item) => {
        if (item.link) {
            window.open(item.link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Container sx={{ minHeight: "500px", minWidth: "100%" }}>
           <CustomTitle title = {"Resources"}/>

            {resourcesData.map((section, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${section.title}-content`}
                        id={`${section.title}-header`}
                    >
                        <Typography variant="h6">{section.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListView items={section.items} onItemClick={handleResourcesClick} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Resources;
