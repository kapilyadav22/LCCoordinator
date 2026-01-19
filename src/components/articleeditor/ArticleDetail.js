import { useLocation, useNavigate } from "react-router-dom";
import { ARTICLES, DeleteBLOGSURL } from "../../constants/urlConstants";
import { useMyContext } from "../../Context/ContextProvider";
import useCustomAlert from "../../customHooks/customAlertHook";
import CustomButton from "../../layout/CustomButton";
import { deleteData } from "../../utils/httpRequestUtils";

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
  };

  if (!articleObj) {
    return (
      <div className="mt-8 text-center text-gray-500 text-lg">
        Article not found!
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95%] lg:max-w-[85%] mx-auto px-2 lg:px-4 py-8">
      <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-text-primary mb-4 font-normal">
          {articleObj.title}
        </h1>
        {adminStatus == "Admin_Kapil" && (
          <div className="mb-4">
            <CustomButton
              className="ml-1"
              onClick={() => handleDeleteArticle()}
            >
              Delete Article
            </CustomButton>
          </div>
        )}
        <div
          className="w-full text-justify text-text-primary text-base sm:text-lg leading-relaxed prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: articleObj.content }}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
