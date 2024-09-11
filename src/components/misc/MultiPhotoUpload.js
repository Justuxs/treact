import React, { useState, useEffect } from "react";

const MultiPhotoUpload = ({ maxPhotos = 5, title = "", onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > maxPhotos) {
      setError(`You can only upload up to ${maxPhotos} photos.`);
      return;
    }

    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({ id: Date.now() + Math.random(), src: reader.result });
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setError(""); // Clear any error if new images are added successfully
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  // Handle image removal
  const handleRemoveImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
    setError(""); // Clear any error when an image is removed
  };

  return (
    <div>
      <h4>{title}</h4>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        disabled={images.length >= maxPhotos}
      />
      {error && <p style={errorStyle}>{error}</p>}
      {images.length > 0 && (
        <div style={gridContainerStyle}>
          {images.map((image) => (
            <div key={image.id} style={imageContainerStyle}>
              <img src={image.src} alt="Uploaded" style={imageStyle} />
              <button
                style={removeButtonStyle}
                onClick={() => handleRemoveImage(image.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "10px",
  marginTop: "20px",
};

const imageContainerStyle = {
  position: "relative",
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
};

const removeButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "3px",
  padding: "5px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
};

export default MultiPhotoUpload;
