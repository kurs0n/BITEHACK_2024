// InstructionList.tsx
import React from "react";

interface InstructionListProps {
  instructions: { index: number; description: string }[];
}

const InstructionList: React.FC<InstructionListProps> = ({ instructions }) => {
  return (
    <ol className="list-decimal pl-5 mt-4">
      {instructions.map((instruction) => (
        <li key={instruction.index}>
          {instruction.index}. {instruction.description}
        </li>
      ))}
    </ol>
  );
};

export default InstructionList;
