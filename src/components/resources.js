import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/httpRequestUtils';
import { BLOGSURL, SERVERURL } from '../constants/urlConstants';
import ListView from '../layout/customListView';
import { resourcesData } from '../dataFields/resourcesData';

const Resources = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const handleResourcesClick = (item) => {
        if (item.link) {
            window.open(item.link, '_blank', 'noopener,noreferrer');
        }
    };
  
  return (
    <Container
    sx={{ minHeight: "500px", minWidth: "100%" }}
>
    <Grid item xs={12} md={6} display="flex" justifyContent="center"
        marginTop={"1%"}>
        <Typography variant="h4" >
            Resources
        </Typography>
    </Grid>
    <ListView items={resourcesData} onItemClick={handleResourcesClick} />
    <Grid item xs={12} md={6} display="flex" justifyContent="center"
        marginTop={"1%"}>
        <Typography variant="h4" >
            CP
        </Typography>
    </Grid>
    <ListView items={resourcesData} onItemClick={handleResourcesClick} />
</Container>
  );
};

export default Resources;
