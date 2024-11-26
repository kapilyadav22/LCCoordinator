import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { deleteData, getData } from '../utils/httpRequestUtils';
import { BLOGSURL, DeleteBLOGSURL } from '../constants/urlConstants';
import ListView from '../layout/CustomListView';
import useCustomAlert from '../customHooks/customAlertHook';
import CustomAlert1 from '../layout/CustomAlert1';
import { useMyContext } from '../Context/ContextProvider';
import { CustomTitle } from '../layout/CustomTitle';

const BlogsPage = () => {
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
            if(res.success){
                showAlert("success", "Article Deleted Successfully");
                fetchArticles();
            }
        }
    };

    const fetchArticles = async () => {
        const res = await getData(BLOGSURL);
        if(res.status=="success") {
            setArticles(res.data);
        }
    };

    const handleArticleClick = (article) => {
        setSelectedItem(article);
        if(adminStatus=="User"){
            navigate(`/article/${encodeURIComponent(article.title)}`, { state: { article } });
        }
       
    };

    return (
        <Container
            sx={{ minHeight: "500px", minWidth: "100%" }}
        >
            <CustomAlert1 alert={alert} />
            <CustomTitle title = {"Articles"}/>
            <Grid item xs={12} md={6} display="flex" justifyContent="flex-end"
                marginBottom={"0.5%"}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{marginLeft : "5px"}}
                    onClick={()=>handleAddArticle()}
                >
                    Add Article
                </Button>
                {(adminStatus=="Admin_Kapil") &&
                <Button
                    variant="contained"
                    color="primary"
                    sx={{marginLeft : "5px"}}
                    onClick={()=>handleDeleteArticle()}
                >
                    Delete Article
                </Button>
                }
            </Grid>
{/* 
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
            ))} */}
            <ListView items={articles} onItemClick={handleArticleClick} />
        </Container>
    );
};

export default BlogsPage;
