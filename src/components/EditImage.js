import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const EditableImage = () => {
  const [image, setImage] = useState("https://via.placeholder.com/300");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickEdit = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <Box sx={{ position: "relative", width: 300, height: 300, mx: "auto" }}>
      <img
        src={image}
        alt="Editable"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Button
        onClick={handleClickEdit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <Typography>Edit Image</Typography>
      </Button>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </Box>
  );
};

export default EditableImage;
