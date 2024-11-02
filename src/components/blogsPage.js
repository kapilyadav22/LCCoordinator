// src/components/BlogsPage.js
import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/httpRequestUtils';
import { SERVERURL } from '../constants/urlConstants';
import { Link } from 'react-router-dom';

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
        const res = await getData(SERVERURL + '/blogs');
        if (res.success) {
            setArticles(res.data);
        }
    };

    const handleArticleClick = (article) => {
        console.log(encodeURIComponent(article.title));
        navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
    };
    

    return (
        <Container sx={{ height: "900px" }}>
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

            <Grid container spacing={1}>
                {articles.map((article) => (
                    <Grid item xs={12} sm={6} key={article.title} 
                    onClick={() => handleArticleClick(article)}>
                            {<Typography
                                variant="body1"
                                component="a"
                                sx={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                    display: 'block',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    },
                                }}
                            >
                                {article.title}
                            </Typography>}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BlogsPage;
