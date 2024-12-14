import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface MicrophoneProps {
  language: string;
  onTranscriptChange: (transcript: string) => void;
}

const Microphone: React.FC<MicrophoneProps> = ({ language, onTranscriptChange }) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [displayedTranscript, setDisplayedTranscript] = useState('');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const onClick = () => {
    if (isMicOn) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsMicOn((prev) => !prev);
  };

  const startRecording = () => {
    setDisplayedTranscript('');
    resetTranscript();
    onTranscriptChange('');
    SpeechRecognition.startListening({
      continuous: true,
      language: language,
    });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (listening) {
      setDisplayedTranscript(transcript);
      onTranscriptChange(transcript);
    }
  }, [transcript, listening, onTranscriptChange]);

  return (
    <button type="button" className="p-2" onClick={onClick}>
      <i className={isMicOn ? "fa-solid fa-xl fa-microphone" : "fa-solid fa-xl fa-microphone-slash"}></i>
    </button>
  );
};

export default Microphone;
