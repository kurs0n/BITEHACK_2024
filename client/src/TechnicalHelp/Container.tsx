// Container.tsx
import React from "react";
import InstructionList from "./InstructionList";
import InputBar from "./InputBar";
import { useInstructions } from "./Context";

const Container: React.FC = () => {
  const { instructions } = useInstructions();

  return (
    <div className="bg-slate-300 p-8 max-w-4xl mx-auto rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-[rgb(62,44,28)]">Witaj, w czym mogę ci dzisiaj pomóc?</h1>

      <div className="flex justify-between items-center bg-[#ffffff] p-4 rounded-lg shadow-md border border-[#d4b59c]">
        <InputBar />
      </div>

      <div className="bg-[#ffffff] p-6 rounded-lg shadow-md border border-[#d4b59c] space-y-4">
        <InstructionList instructions={instructions} />
      </div>
    </div>
  );
};

export default Container;
