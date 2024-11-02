import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

const ArticleDetail = () => {
    const location = useLocation();
    const article = location.state?.article;

    if (!article) {
        return <Typography variant="h6" align="center">Article not found!</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                mt={4} 
                mb={4} 
                p={2} 
                boxShadow={3} 
                borderRadius={2} 
                bgcolor="background.paper"
            >
                <Typography variant="h4" gutterBottom>
                    {article.title}
                </Typography>
                <Box 
                    sx={{
                        width: '100%',
                        textAlign: 'justify',
                        '& h1, & h2, & h3': { marginTop: '1rem' },
                    }} 
                    dangerouslySetInnerHTML={{ __html: article.content }} 
                />
            </Box>
        </Container>
    );
};

export default ArticleDetail;
