// src/VolunteerHelp/InputBar.tsx
import React, { useState } from "react";

const InputBar: React.FC = () => {
  const [input, setInput] = useState("");
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle input submission here, like adding to a list or sending to an API
    console.log(input);
    setInput("");
  };

  return (
    <form className="flex items-center w-full mb-4 rounded-full border-stone-800 border-4" onSubmit={handleSubmit}>
      <div className="p-2 text-stone-700 bg-1 rounded-l-full">
        <i className="fa-regular fa-xl fa-circle-question text-stone-800"></i>
      </div>

      <input
        type="text"
        className="p-2 w-full focus:outline-none text-stone-800 placeholder-stone-500 bg-main bg-1"
        placeholder="Tutaj możesz wpisać swoje pytanie"
      />
      {isChrome && <Microphone language={"pl"} onTranscriptChange={handleTranscriptChange} />}
      <button type="submit" className="p-2 border-l-4 border-stone-800 bg-stone rounded-r-3xl bg-orange-200">
        <i className="fa-solid fa-xl fa-arrow-right text-stone-800"></i>
      </button>
    </form>
  );
};

export default InputBar;
