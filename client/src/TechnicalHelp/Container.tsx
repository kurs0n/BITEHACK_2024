// Container.tsx
import React from "react";
import InstructionList from "./InstructionList";
import InputBar from "./InputBar";
import { useInstructions } from "./Context";

const Container: React.FC = () => {
  const { instructions } = useInstructions();

  return (
    <div className="bg-main p-8 max-w-4xl mx-auto rounded-2xl shadow-lg">
      <h1 className="text-4xl text-center">Witaj, w czym mogę ci dzisiaj pomóc?</h1>

      <div className="flex justify-between items-center p-4 rounded-lg">
        <InputBar />
      </div>

      <div className="bg-main p-6 rounded-lg space-y-4">
        <InstructionList instructions={instructions} />
      </div>
    </div>
  );
};

export default Container;
