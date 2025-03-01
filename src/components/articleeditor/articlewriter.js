import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADDBLOGSURL, ARTICLES, UPLOADIMAGEURL } from '../../constants/urlConstants';
import useCustomAlert from '../../customHooks/customAlertHook';
import CustomAlert1 from '../../layout/CustomAlert1';
import { postData } from '../../utils/httpRequestUtils';

const ArticleWriter = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, false] }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean']
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
        const imageUrl = "https://miro.medium.com/v2/resize:fit:1400/1*T5lU_ZlNnSTNBDLDZuuqGQ.jpeg";
        // const imageUrl = "https://lccoordinator-articles.s3.us-east-1.amazonaws.com/uploads/11.png";
        if (imageUrl && quillInstanceRef.current) {
          console.log(imageUrl);
          const range = quillInstanceRef.current.getSelection();
          quillInstanceRef.current.insertEmbed(range.index, "image", imageUrl);
          quillInstanceRef.current.setSelection(range.index + 1);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: TOOLBAR_OPTIONS,
            handlers: {
              image: imageHandler
            }
          }
        }
      });
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
        showAlert('success', 'Article saved successfully');
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
    formData.append('file', file);

    if (!file) {
      showAlert("error", "Please Upload a Valid Image");
      return;
    }

    try {
      const response = await fetch(UPLOADIMAGEURL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        showAlert("error", "Error Uploading File");
        return;
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      showAlert("error", 'Error Uploading File');
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const content =  quillInstanceRef.current? quillInstanceRef.current.root.innerHTML : '';
    const article = { category, title, content };
    createArticle(article);
  };

  const handlePreviewOpen = () => {
    const content = quillInstanceRef.current? quillInstanceRef.current.root.innerHTML : '';
    setPreviewContent(content);
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setPreviewContent('');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div ref={quillRef} style={{ height: '600px', marginBottom: '20px', position: 'relative' }} />
        <Box display="flex" justifyContent="space-between" mt={6}>
          <Button variant="outlined" color="secondary" onClick={handlePreviewOpen}>
            Preview
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Article
          </Button>
        </Box>
      </form>

      <Modal open={isPreviewOpen} onClose={handlePreviewClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h5" gutterBottom>
            {title || ''}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handlePreviewClose} color="primary">
              Close
            </Button>
          </Box>
          <CustomAlert1 alert={alert} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ArticleWriter;
