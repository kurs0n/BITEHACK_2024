// src/VolunteerHelp/InputBar.tsx
import React, { useState } from "react";
import Microphone from "./Microphone";
import { Regions } from "../VolounterSignUp/FormData";
import HelperModal from "../helper/helper";

type InputBarProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setVolunteers: React.Dispatch<React.SetStateAction<any[]>>;
};

const InputBar: React.FC<InputBarProps> = ({ setIsLoading, setVolunteers }) => {
  const [input, setInput] = useState("");
  const [selectedVoivodeship, setSelectedVoivodeship] = useState("");
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const [isOpen, setIsOpen] = useState(false); 

  // Mapowanie enuma na tablicę wartości
  const voivodeships = Object.values(Regions);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/list-volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          voivodeship: selectedVoivodeship,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setVolunteers(data);
      } else {
        console.error("Failed to fetch volunteer data.");
      }
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    } finally {
      setIsLoading(false);
    }

    setInput("");
    setSelectedVoivodeship("");
  };

  const handleTranscriptChange = (transcript: string) => {
    setInput(transcript);
  };


  return (
    <form className="flex flex-col w-full mb-8" onSubmit={handleSubmit}>
      <div className="flex items-center mb-2">
        <div className="flex w-full border-4 border-stone-800 rounded-full">
          <HelperModal src="/volunteer-search-helper.png"/>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 w-full focus:outline-none text-stone-800 placeholder-stone-500 bg-main bg-1 rounded-l-full"
            placeholder="Tutaj wpisz jakiego typu pomocy potrzebujesz"
          />
          {isChrome && <Microphone language={"pl"} onTranscriptChange={handleTranscriptChange} />}
          <button type="submit" className="p-2 pborder-l-4 border-stone-800 bg-stone rounded-r-3xl bg-orange-200">
            <i className="fa-solid fa-xl fa-arrow-right text-stone-800"></i>
          </button>
        </div>
      </div>

      <select
        value={selectedVoivodeship}
        onChange={(e) => setSelectedVoivodeship(e.target.value)}
        className="p-2 w-1/2 mx-auto mt-2 focus:outline-none text-stone-800 bg-main bg-1 rounded-full py-2 px-4"
      >
        <option value="" disabled>
          Wybierz województwo
        </option>
        {voivodeships.map((voivodeship, index) => (
          <option key={index} value={voivodeship}>
            {voivodeship}
          </option>
        ))}
      </select>
    </form>
  );
};

export default InputBar;
