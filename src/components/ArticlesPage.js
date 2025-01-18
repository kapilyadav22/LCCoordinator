import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { deleteData, getData } from '../utils/httpRequestUtils';
import { BLOGSURL, DeleteBLOGSURL } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';
import { useMyContext } from '../Context/ContextProvider';
import { CustomTitle } from '../layout/CustomTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAccordion  from '../layout/CustomAccordion';


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

    const handleDeleteArticle = async () => {
        if (Object.keys(selectedItem).length === 0) {
            showAlert("error", "Please select an article");
        } else {
            const res = await deleteData(`${DeleteBLOGSURL}/${selectedItem.title}`);
            if (res.success) {
                showAlert("success", "Article Deleted Successfully");
                fetchArticles();
            }
        }
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
        <Container sx={{ minHeight: "550px", minWidth: "100%" }}
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
                    </Button><Button
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: "5px" }}
                        onClick={() => handleDeleteArticle()}
                    >
                            Delete Article
                        </Button></>
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
