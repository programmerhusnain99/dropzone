import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function Crop() {
  const [imageUrls, setImageUrls] = useState({
    avatar: '',
    newAvatar: null,
    cropped: null,
  });

  const [cropper, setCropper] = useState(null); // Add this line to define 'cropper' state

  const getNewAvatarUrl = (e) => {
    if (e.target.files) {
      const newAvatar = URL.createObjectURL(e.target.files[0]);
      setImageUrls((prev) => ({ ...prev, avatar: newAvatar, newAvatar }));
    }
  };

  const getCropData = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedDataURL = croppedCanvas.toDataURL();
      setImageUrls((prev) => ({ ...prev, cropped: croppedDataURL }));
    }
  };

  return (
    <>
      <input
        type='file'
        accept='image/png, image/jpeg, image/jpg, image/avif'
        onChange={getNewAvatarUrl}
      />
      {imageUrls.newAvatar && (
        <div>
          <p>New Avatar Preview:</p>
          <img
            src={imageUrls.newAvatar}
            alt='New Avatar Preview'
            style={imagePreviewStyle}
          />
        </div>
      )}
      <Cropper
        src={imageUrls.avatar}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={4 / 3}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        guides={false}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <button onClick={getCropData}>Crop Image</button>

      {/* Display the cropped image */}
      {imageUrls.cropped && (
        <div>
          <p>Cropped Image Preview:</p>
          <img
            src={imageUrls.cropped}
            alt='Cropped Image Preview'
            style={imagePreviewStyle}
          />
        </div>
      )}
    </>
  );
}

const imagePreviewStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '10px',
};

export default Crop;
