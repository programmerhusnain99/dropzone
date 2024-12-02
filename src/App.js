import React from 'react';
import './App.css';
import CombinedComponent from './CombinedComponent';
import Upload from './Upload';
import Crop from './Crop';

function App() {


  return (
    <>
      <h1 className='App'>React-DropZone</h1>
      <CombinedComponent/>
      {/* This is for GitHub Test */}
      {/* <Upload/> */}
      {/* <Crop/> */}
    </>
  );
}

export default App;
