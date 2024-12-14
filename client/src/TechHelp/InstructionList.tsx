import React from "react";
import Task from "./Task";

interface InstructionListProps {
  instructions: {
    index: number;
    description: string;
    icon?: string;
  }[];
}

const InstructionList: React.FC<InstructionListProps> = ({ instructions }) => {
  return (
    <div className="h-96 overflow-y-auto p-4 rounded-xl w-full ">
      {instructions.length === 0 ? (
        <div className="flex justify-center items-center h-full text-stone-400 text-lg">
          Tutaj pojawią się kroki, które musisz wykonać
        </div>
      ) : (
        <ol>
          {instructions.map((instruction) => (
            <Task
              key={instruction.index}
              index={instruction.index}
              description={instruction.description}
              icon={instruction.icon}
            />
          ))}
        </ol>
      )}
    </div>
  );
};

export default InstructionList;
