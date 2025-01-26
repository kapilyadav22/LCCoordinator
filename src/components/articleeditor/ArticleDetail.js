import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { ARTICLES, DeleteBLOGSURL } from '../../constants/urlConstants';
import { useMyContext } from '../../Context/ContextProvider';
import useCustomAlert from '../../customHooks/customAlertHook';
import { deleteData } from '../../utils/httpRequestUtils';

const ArticleDetail = () => {
    const location = useLocation();
    const articleObj = location.state?.article;
    const { showAlert } = useCustomAlert();
    const { adminStatus } = useMyContext();

     const navigate = useNavigate();
    const handleDeleteArticle = async () => {
        const res = await deleteData(`${DeleteBLOGSURL}/${articleObj.title}`);
        if (res.status === "success") {
            showAlert("success", "Article Deleted Successfully");
            navigate(ARTICLES);
        } else {
            showAlert("error", res);
        }
    }

if (!articleObj) {
    return (
        <Typography
            variant="h6"
            align="center"
            sx={{ mt: 4, color: 'text.secondary' }}
        >
            Article not found!
        </Typography>
    );
}

return (
    <Container maxWidth="xl" sx={{ padding: { xs: 2, md: 1, lg: 1, xl: 1 } }}>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={4}
            mb={4}
            p={{ xs: 2, sm: 3, md: 4 }}
            boxShadow={3}
            borderRadius={2}
            bgcolor="background.paper"
            sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '90%', md: '80%' },
                margin: '0 auto',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    textAlign: 'center',
                    color: 'text.secondary'
                }}
            >
                {articleObj.title}
            </Typography>
            {(adminStatus == "Admin_Kapil") &&
            <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: "5px" }}
                onClick={() => handleDeleteArticle()}
            >
                Delete Article
            </Button>
            }
            <Box
                sx={{
                    width: '100%',
                    textAlign: 'justify',
                    '& h1, & h2, & h3': {
                        marginTop: '1rem',
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                    },
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: { xs: 1.5, sm: 1.7, md: 1.8 },
                    color: 'text.primary',
                    '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                        margin: '1rem auto',
                        borderRadius: '8px',
                    },
                }}
                dangerouslySetInnerHTML={{ __html: articleObj.content }}
            />
        </Box>
    </Container>
);
};

export default ArticleDetail;
