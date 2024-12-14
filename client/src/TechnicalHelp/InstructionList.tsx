// InstructionList.tsx
import React from "react";
import Task from "./Task";

interface InstructionListProps {
  instructions: { index: number; description: string }[];
}

const InstructionList: React.FC<InstructionListProps> = ({ instructions }) => {
  return (
    <ol className="pl-5 mt-4">
      {instructions.map((instruction) => (
        <Task key={instruction.index} index={instruction.index} description={instruction.description}/>
      ))}
    </ol>
  );
};

export default InstructionList;
