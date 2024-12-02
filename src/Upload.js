import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function Upload() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Assuming only one file is uploaded, you can modify this if handling multiple files
      const file = acceptedFiles[0];

      // Create a data URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);

      // Set the state to trigger a re-render and display the image
      setUploadedImage(imageUrl);
    },
  });

  return (
    <>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or <button>click to select files</button></p>
          {acceptedFiles.map((file) => (
            <p key={file.path}>{file.path}</p>
          ))}
      </div>
      {uploadedImage && (
        <div>
          <p>Uploaded Image Preview:</p>
          <img src={uploadedImage} alt="Uploaded Preview" style={imagePreviewStyle} />
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
  maxHeight: '300px', // Set a maximum height to limit the image size on the screen
  marginTop: '10px',
};

export default Upload;