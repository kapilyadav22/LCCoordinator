import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/httpRequestUtils';
import { BLOGSURL, SERVERURL } from '../constants/urlConstants';
import ListView from '../layout/CustomListView';

const BlogsPage = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleAddArticle = () => {
        navigate('/addarticle');
    };

    const fetchArticles = async () => {
        const res = await getData(BLOGSURL);
        if (res.success) {
            setArticles(res.data);
        }
    };

    const handleArticleClick = (article) => {
        navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
    };


    return (
        <Container
            sx={{ minHeight: "500px", minWidth: "100%" }}
        >
            <Grid item xs={12} md={6} display="flex" justifyContent="center"
                marginTop={"1%"}>
                <Typography variant="h4" >
                    Articles
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} display="flex" justifyContent="flex-end"
                marginBottom={"0.5%"}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddArticle}
                >
                    Add Article
                </Button>
            </Grid>
            <ListView items={articles} onItemClick={handleArticleClick} />
        </Container>
    );
};

export default BlogsPage;
