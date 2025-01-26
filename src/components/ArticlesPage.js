import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BLOGSURL } from '../constants/urlConstants';
import { useMyContext } from '../Context/ContextProvider';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAccordion from '../layout/CustomAccordion';
import CustomAlert1 from '../layout/CustomAlert1';
import { CustomTitle } from '../layout/CustomTitle';
import { getData } from '../utils/httpRequestUtils';


const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const { adminStatus } = useMyContext();


    const { alert, showAlert } = useCustomAlert();
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleAddArticle = () => {
        navigate('/addarticle');
    };


    const fetchArticles = async () => {
        const res = await getData(BLOGSURL);
        if (res.status === "success") {
            console.log(res.data);
            setArticles(res.data);
        } else {
            showAlert("error", res);
        }
    };

    const handleArticleClick = (article) => {
        setSelectedItem(article);
        // if(adminStatus=="User"){
        navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
        // }

    };

    return (
        <Container sx={{ minWidth: "100%" }}
        >
            <CustomAlert1 alert={alert} />
            <CustomTitle title={"Articles"} />
            <Grid item xs={12} md={6} display="flex" justifyContent="flex-end"
                marginBottom={"0.5%"}>
                {(adminStatus == "Admin_Kapil") &&
                    <><Button
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: "5px" }}
                        onClick={() => handleAddArticle()}
                    >
                        Add Article
                    </Button>
                   
                        </>
                }
            </Grid>

            {Object.entries(articles).map(([category, articles], index) => (
                <CustomAccordion
                index = {index}
                category={category} 
                content={articles} 
                handleClick={handleArticleClick}/>
            ))}
        </Container>
    );
};

export default ArticlesPage;
