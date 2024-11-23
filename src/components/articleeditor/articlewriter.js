import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { postData } from '../../utils/httpRequestUtils';
import { BLOGSURL, SERVERURL } from '../../constants/urlConstants';
import { useMyContext } from '../../Context/ContextProvider';
import useCustomAlert from '../../customHooks/customAlertHook';
import CustomAlert1 from '../../layout/CustomAlert1';

const ArticleWriter = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { updateUserName, updateLogin } = useMyContext();
  const { alert, showAlert } = useCustomAlert();
  
  const createArticle = async (article) => {
    const res = await postData(BLOGSURL, article);
    console.log(res);
    if(res.success){
      console.log("sf");
      showAlert("success", "Article saved successfully");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, content };
    createArticle(article);
  };

  const handlePreviewOpen = () => setIsPreviewOpen(true);
  const handlePreviewClose = () => setIsPreviewOpen(false);

  return (
    <Box sx={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          style={{ height: '600px', marginBottom: '20px' }}
        />
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
          borderRadius: 2
        }}>
          <Typography variant="h5" gutterBottom>
            {title || ''}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: content }} />
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
