import React, { useState } from 'react';
import './App.css';
import BpmAnalyzer from './components/BpmAnalyzer';
import FileUploader from './components/FileUploader';

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="App">
      <h1>Analizzatore di BPM</h1>
      <FileUploader onFileSelect={setFile} />
      <BpmAnalyzer file={file} />
    </div>
  );
}

export default App;
