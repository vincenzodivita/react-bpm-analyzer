import React, { useState } from 'react';
import { analyze } from 'web-audio-beat-detector';

const BpmAnalyzer = () => {
  const [bpm, setBpm] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Nessun file selezionato');
    }
  };

  const handleAnalyze = async () => {
    if (file) {
      try {
        // Creare un contesto audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Leggere il file come array buffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Decodificare l'array buffer in un audio buffer
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Analizzare i BPM usando web-audio-beat-detector
        const detectedBpm = await analyze(audioBuffer);
        setBpm(detectedBpm);
        setError(null);
      } catch (err) {
        setError('Errore durante l\'analisi del file audio');
        console.error('Errore:', err);
      }
    } else {
      setError('Nessun file selezionato');
    }
  };

  return (
    <div>
      <h1>Analizzatore di BPM</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleAnalyze}>Calcola BPM</button>
      {bpm && <p>BPM: {bpm}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BpmAnalyzer;
