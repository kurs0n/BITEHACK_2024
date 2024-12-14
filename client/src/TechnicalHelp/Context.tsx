// Context.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Instruction {
  index: number;
  description: string;
}

interface InstructionContextType {
  instructions: Instruction[];
  fetchInstructions: (steps: Instruction[]) => void;
}

const InstructionContext = createContext<InstructionContextType | undefined>(undefined);

interface InstructionProviderProps {
  children: ReactNode;
}

export const InstructionProvider: React.FC<InstructionProviderProps> = ({ children }) => {
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  const fetchInstructions = (steps: Instruction[]) => {
    setInstructions(steps);
  };

  return (
    <InstructionContext.Provider value={{ instructions, fetchInstructions }}>{children}</InstructionContext.Provider>
  );
};

export const useInstructions = (): InstructionContextType => {
  const context = useContext(InstructionContext);
  if (!context) {
    throw new Error("useInstructions must be used within an InstructionProvider");
  }
  return context;
};
