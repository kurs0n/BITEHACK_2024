import React, { useState, useEffect } from "react";
import InstructionList from "./InstructionList";
import InputBar from "./InputBar";
import { useInstructions } from "./Context";

const Container: React.FC = () => {
  const { instructions } = useInstructions();
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-trans p-20 border-8 border-stone-800 rounded-3xl w-2/3 backdrop-blur-lg">
      <h1
        className={`text-4xl text-center mx-auto overflow-hidden whitespace-nowrap mb-12 ${
          isTyping ? "animate-typing border-r-4 border-black" : ""
        }`}
        style={{ width: "fit-content", fontWeight: 800 }}
      >
        Witaj, w czym mogę ci dzisiaj pomóc?
      </h1>
      <div className="flex justify-between items-center p-4 rounded-lg">
        <InputBar />
      </div>
      <div className="bg-main p-6 rounded-3xl space-y-4">
        <InstructionList instructions={instructions} />
      </div>
    </div>
  );
};

export default Container;
