import React, { useState } from 'react';
import { analyze } from 'web-audio-beat-detector';

const BpmAnalyzer = ({ file }) => {
  const [bpm, setBpm] = useState(null);
  const [error, setError] = useState(null);

  const roundBpm = (value) => {
    return Math.round(value * 100) / 100;
  };

  const handleAnalyze = async () => {
    if (file) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const detectedBpm = await analyze(audioBuffer);
        
        // Arrotonda i BPM usando la funzione roundBpm
        const roundedBpm = roundBpm(detectedBpm);
        setBpm(roundedBpm);
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
      <button onClick={handleAnalyze}>Calcola BPM</button>
      {bpm !== null && <p>BPM: {bpm}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BpmAnalyzer;
