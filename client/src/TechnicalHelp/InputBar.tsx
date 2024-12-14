import React, { useState } from "react";
import { useInstructions } from "./Context";

const InputBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const { fetchInstructions } = useInstructions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim() === "") {
      return;
    }

    const payload = {
      prompt: query,
    };

    try {
      const response = await fetch("http://localhost:3000/steps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      fetchInstructions(data.steps);

      setQuery("");
    } catch (error) {
      console.error("Error fetching instructions:", error);
    }
  };

  return (
    <form className="flex items-center w-full mb-4 rounded-full border-stone-800 border-4" onSubmit={handleSubmit}>
      <div className="p-2 text-gray-700">
        <i className="fa-regular fa-xl fa-circle-question text-stone-800"></i>
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="p-2 w-full focus:outline-none text-stone-800 placeholder-stone-500 bg-main"
        placeholder="Tutaj możesz wpisać swoje pytanie"
      />

      <button type="submit" className="p-2 border-l-4 border-stone-800 bg-stone rounded-r-3xl bg-lime-200 ">
        <i className="fa-solid fa-xl fa-arrow-right text-stone-800"></i>
      </button>
    </form>
  );
};

export default InputBar;
