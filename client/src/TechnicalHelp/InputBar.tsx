import React, { useState } from "react";
import { useInstructions } from "./Context";
import Microphone from "./Microphone";

interface InputBarProps {
  setIsLoading: (loading: boolean) => void; // Funkcja do ustawiania stanu isLoading
}

const InputBar: React.FC<InputBarProps> = ({ setIsLoading }) => {
  const [query, setQuery] = useState("");
  const { fetchInstructions } = useInstructions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleTranscriptChange = (transcript: string) => {
    setQuery(transcript);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim() === "") {
      return;
    }

    const payload = {
      prompt: query,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/steps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      fetchInstructions(data.steps);

      setQuery("");
    } catch (error) {
      console.error("Error fetching instructions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex items-center w-full mb-4 rounded-full border-stone-800 border-4" onSubmit={handleSubmit}>
      <div className="p-2 text-gray-700 bg-1 rounded-l-full">
        <i className="fa-regular fa-xl fa-circle-question text-stone-800"></i>
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="p-2 w-full focus:outline-none text-stone-800 placeholder-stone-500 bg-main bg-1"
        placeholder="Tutaj możesz wpisać swoje pytanie"
      />
      <Microphone language={"pl"} onTranscriptChange={handleTranscriptChange} />
      <button type="submit" className="p-2 border-l-4 border-stone-800 bg-stone rounded-r-3xl bg-lime-200 ">
        <i className="fa-solid fa-xl fa-arrow-right text-stone-800"></i>
      </button>
    </form>
  );
};

export default InputBar;
