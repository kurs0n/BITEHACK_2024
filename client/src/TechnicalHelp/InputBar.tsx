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

    // Send a POST request with the payload
    try {
      const response = await fetch("http://localhost:3000/steps", {
        // method: "POST",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(payload), // Pass the payload as a JSON string
      });

      const data = await response.json();
      console.log(data);
      // Assuming the response contains the "steps" data
      fetchInstructions(data.steps);

      setQuery(""); // Clear the input after submitting
    } catch (error) {
      console.error("Error fetching instructions:", error);
    }
  };

  return (
    <form className="flex items-center mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="border border-gray-300 rounded-l-lg p-2 flex-1"
        placeholder="Tutaj możesz wpisać swoje pytanie"
      />
      <button type="submit" className="bg-[#B5673E] text-white px-4 py-2 rounded-r-lg">
        ➤
      </button>
    </form>
  );
};

export default InputBar;
