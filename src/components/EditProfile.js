import React, { useState } from "react";
import { Container, TextField, Button, Grid, Typography, Box } from "@mui/material";
import { postData } from "../utils/httpRequestUtils";
import { EDITPROFILE, PROFILE } from "../constants/urlConstants";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    userName: "",
    codechef: "",
    codeforces: "",
    leetcode: "",
    gfg: "",
    github: "",
    linkedin: "",
  });

    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = async (event) => {
     event.preventDefault();
 
     const res = await postData(EDITPROFILE,formData);
     if(res.success){
       console.log("success", formData);
        navigate(PROFILE);
     }
   };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="UserName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CodeChef Handle"
                name="codechef"
                value={formData.codechef}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Codeforces Handle"
                name="codeforces"
                value={formData.codeforces}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LeetCode Handle"
                name="leetcode"
                value={formData.leetcode}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GFG Handle"
                name="gfg"
                value={formData.gfg}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GitHub Handle"
                name="github"
                value={formData.github}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn Handle"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditProfile;
