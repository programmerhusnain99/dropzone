import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function CombinedComponent() {
  const [imageUrls, setImageUrls] = useState({
    uploaded: null,
    cropped: null,
  });
  const [cropper, setCropper] = useState(null);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrls({ uploaded: imageUrl, cropped: null });
    },
  });

  const getCropData = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedDataURL = croppedCanvas.toDataURL();
      setImageUrls((prev) => ({ ...prev, cropped: croppedDataURL }));
    }
  };

  return (
    <>
      <div style={dropzoneStyles} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
          {acceptedFiles.map((file) => (
            <p key={file.path}>{file.path}</p>
          ))}
      </div>

      {imageUrls.uploaded && (
        <div>
          <p>Uploaded Image Preview:</p>
          <img src={imageUrls.uploaded} alt="Uploaded Preview" style={imagePreviewStyle} />
        </div>
      )}

      <Cropper
        src={imageUrls.uploaded}
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

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imagePreviewStyle = {
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '10px',
};

export default CombinedComponent; 