// src/components/BlogsPage.js
import React from 'react';
import { Grid, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getData } from '../utils/httpRequestUtils';

const articles = [
    { id: 1, title: 'Understanding React', link: '/articles/understanding-react' },
    { id: 2, title: 'Getting Started with MUI', link: '/articles/getting-started-with-mui' },
    { id: 3, title: 'Building a Blog with React', link: '/articles/building-a-blog' },
];

const BlogsPage = () => {
    const navigate = useNavigate();
    const handleAddArticle = () => {
        navigate('/addarticle');
    };

    const fetchArticles = async () => {
        const articles = await getData('/api/articles');
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
                    <Grid item xs={12} sm={6} key={article.id}>
                        <Typography
                            variant="body1"
                            component="a"
                            href={article.link}
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
                        </Typography>
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
};

export default BlogsPage;
