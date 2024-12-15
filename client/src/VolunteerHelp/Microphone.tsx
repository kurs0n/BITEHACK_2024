import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface MicrophoneProps {
  language: string;
  onTranscriptChange: (transcript: string) => void;
}

const Microphone: React.FC<MicrophoneProps> = ({ language, onTranscriptChange }) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Check if the browser supports speech recognition
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
    resetTranscript();
    onTranscriptChange(""); // Clear previous transcript
    SpeechRecognition.startListening({
      continuous: true,
      language: language,
    });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  // Effect to update the transcript when listening state changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (listening) {
      onTranscriptChange(transcript);
    }
  }, [transcript, listening, onTranscriptChange]);

  return (
    <button type="button" className="p-2 pr-2 bg-1" onClick={onClick}>
      <i className={isMicOn ? "fa-solid fa-xl fa-microphone" : "fa-solid fa-xl fa-microphone-slash"}></i>
    </button>
  );
};

export default Microphone;
