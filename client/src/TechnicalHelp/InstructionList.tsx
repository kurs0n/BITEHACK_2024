import React from "react";
import Task from "./Task";

interface InstructionListProps {
  instructions: {
    index: number;
    description: string;
    icon?: string; // Add the icon field to the instruction data type
  }[];
}

const InstructionList: React.FC<InstructionListProps> = ({ instructions }) => {
  return (
    <div className="h-72 overflow-y-auto p-4 rounded-lg bg-main">
      <ol className="list-decimal pl-5 ">
        {instructions.map((instruction) => (
          <Task
            key={instruction.index}
            index={instruction.index}
            description={instruction.description}
            icon={instruction.icon} // Pass the icon URL here
          />
        ))}
      </ol>
    </div>
  );
};

export default InstructionList;
