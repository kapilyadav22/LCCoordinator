import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BLOGSURL } from "../constants/urlConstants";
import { useMyContext } from "../Context/ContextProvider";
import useCustomAlert from "../customHooks/customAlertHook";
import CustomAccordion from "../layout/CustomAccordion";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomButton from "../layout/CustomButton";
import { CustomTitle } from "../layout/CustomTitle";
import { getData } from "../utils/httpRequestUtils";

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
    navigate("/addarticle");
  };

  const fetchArticles = async () => {
    const res = await getData(BLOGSURL);
    if (res.status === "success") {
      setArticles(res.data);
    } else {
      showAlert("error", res);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedItem(article);
    navigate(`/article/${encodeURIComponent(article.title)}`, {
      state: { article },
    });
  };

  return (
    <div className="w-full px-4 py-8">
      <CustomAlert1 alert={alert} />
      <CustomTitle title={"Articles"} />
      <div className="flex justify-end mb-2">
        {adminStatus == "Admin_Kapil" && (
          <div className="ml-1">
            <CustomButton onClick={() => handleAddArticle()}>
              Add Article
            </CustomButton>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(articles).map(([category, articles], index) => (
          <CustomAccordion
            key={index + category}
            index={index}
            category={category}
            content={articles}
            handleClick={handleArticleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
