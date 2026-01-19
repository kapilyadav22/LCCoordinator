import { useState } from "react";

const EditableImage = () => {
  const [image, setImage] = useState("");

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
    <div className="relative w-[300px] h-[300px] mx-auto group">
      <img
        src={image}
        alt="Editable"
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        onClick={handleClickEdit}
        className="
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-black/50 text-white flex items-center justify-center
          hover:bg-black/80 transition-colors rounded px-4 py-2
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        "
      >
        <span>Edit Image</span>
      </button>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default EditableImage;
