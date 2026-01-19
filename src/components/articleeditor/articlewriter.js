import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ADDBLOGSURL,
  ARTICLES,
  UPLOADIMAGEURL,
} from "../../constants/urlConstants";
import useCustomAlert from "../../customHooks/customAlertHook";
import CustomAlert1 from "../../layout/CustomAlert1";
import { postData } from "../../utils/httpRequestUtils";
import CustomTextField from "../../layout/CustomTextField";
import CustomButton from "../../layout/CustomButton";

import { ThemeContext } from "../../Context/ThemeContext.js";

const ArticleWriter = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const { mode } = useContext(ThemeContext);
  const color = mode === "light" ? "black" : "white";

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, false] }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    ["clean"],
    [
      {
        color: [
          "red",
          "blue",
          "green",
          "black",
          "white",
          "#FF9800",
          "#9C27B0",
          "#E91E63",
        ],
      },
    ],
  ];

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        // const imageUrl = await uploadImage(file);
        const imageUrl =
          "https://miro.medium.com/v2/resize:fit:1400/1*T5lU_ZlNnSTNBDLDZuuqGQ.jpeg";
        if (imageUrl && quillInstanceRef.current) {
          console.log(imageUrl);
          const range = quillInstanceRef.current.getSelection();
          if (range) {
            quill.format("color", color);
          }
          quillInstanceRef.current.insertEmbed(range.index, "image", imageUrl);
          quillInstanceRef.current.setSelection(range.index + 1);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: TOOLBAR_OPTIONS,
            handlers: {
              image: imageHandler,
            },
          },
        },
      });
    }
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.style.color = color;
    }

    return () => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current = null;
      }
    };
  }, []);

  const createArticle = async (article) => {
    try {
      const res = await postData(ADDBLOGSURL, article);
      if (res.status === "success") {
        showAlert("success", "Article saved successfully");
        navigate(ARTICLES);
      } else {
        showAlert("error", res);
      }
    } catch (error) {
      showAlert("error", "Error saving article");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    if (!file) {
      showAlert("error", "Please Upload a Valid Image");
      return;
    }

    try {
      const response = await fetch(UPLOADIMAGEURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        showAlert("error", "Error Uploading File");
        return;
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      showAlert("error", "Error Uploading File");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = quillInstanceRef.current
      ? quillInstanceRef.current.root.innerHTML
      : "";
    const article = { category, title, content };
    createArticle(article);
  };

  const handlePreviewOpen = () => {
    const content = quillInstanceRef.current
      ? quillInstanceRef.current.root.innerHTML
      : "";
    setPreviewContent(content);
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setPreviewContent("");
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomTextField
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <CustomTextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div
          ref={quillRef}
          className="h-[600px] mb-5 relative bg-white dark:bg-gray-800 text-text-primary rounded"
        />
        <div className="flex justify-between mt-6">
          <CustomButton
            type="button"
            className="!bg-gray-600 hover:!bg-gray-700"
            onClick={handlePreviewOpen}
          >
            Preview
          </CustomButton>
          <CustomButton type="submit">Save Article</CustomButton>
        </div>
      </form>

      {/* Modal for Preview */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">
              {title || ""}
            </h2>
            <div
              className="prose dark:prose-invert max-w-none text-text-primary"
              dangerouslySetInnerHTML={{ __html: previewContent }}
              style={{ color: color }}
            />
            <div className="flex justify-end mt-4">
              <CustomButton onClick={handlePreviewClose}>Close</CustomButton>
            </div>
            <CustomAlert1 alert={alert} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleWriter;
