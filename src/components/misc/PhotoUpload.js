import React, { useState, useEffect } from "react";

const PhotoUpload = ({ title = "", onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (onImageChange) {
      onImageChange(selectedImage);
    }
  }, [selectedImage, onImageChange]);

  return (
    <div>
      <h4>{title}</h4>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h3>Selected Image:</h3>
          <img
            src={selectedImage}
            alt="Uploaded"
            style={{ width: "300px", height: "auto", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
