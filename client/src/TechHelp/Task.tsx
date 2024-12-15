import React, { useState } from "react";
import { useInstructions } from "./Context"; // Import the useInstructions hook

type TaskProps = {
  index: number;
  description: string;
  icon?: string;
};

const Task: React.FC<TaskProps> = ({ index, description, icon }) => {
  const { instructions } = useInstructions(); // Access the instructions from the context
  const [detailedStep, setDetailedStep] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTaskClick = async () => {
    if (detailedStep === null) {
      setIsLoading(true);
      try {
        const body = JSON.stringify({
          "instruction-list": instructions,
          prompt: description,
        });

        console.log(body);

        const response = await fetch("http://localhost:3000/detailed-step", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });

        if (response.ok) {
          const data = await response.text();

          // Clean the fetched data by removing unwanted characters
          const cleanedData = data.replace(/["\n]/g, "").trim(); // Remove quotes and newlines
          setDetailedStep(cleanedData); // Set the cleaned detailed step
        }
      } catch (error) {
        console.error("Error fetching detailed step:", error);
      } finally {
        setIsLoading(false);
      }
    }

    // Toggle the expanded state
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group h-full relative ">
      {/* Wrap the li in a div with full height */}
      <span className="text-sm text-stone-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Kliknij by uzyskac wiecej informacji
      </span>

      <div className={`h-full bg-2 rounded-r-2xl relative `}>
        {/* Blur Overlay */}
        {isLoading && (
          <div className="absolute inset-0 backdrop-blur-sm rounded-r-2xl z-10 flex items-center justify-center text-xl">
            Ładowanie...
          </div>
        )}
        <li
          className={`flex flex-col items-start bg-1 p-2 px-6 border-l-4 rounded-r-xl ease-in-out border-stone-800 ${
            isExpanded ? "w-full" : "w-fit"
          }`}
          onClick={handleTaskClick}
        >
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold text-stone-800 mr-4">{index}.</span>
            <span>{description}</span>
            {icon && (
              <img
                src={icon}
                alt={`icon-${index}`}
                className="h-12 rounded-xl ml-auto" // Move icon to the right
              />
            )}
          </div>
          {isExpanded && detailedStep && (
            <div className="text-stone-600 mx-12 my-3 py-4 border-t-2 border-stone-800">
              {detailedStep} {/* Display the detailed step under the task */}
            </div>
          )}
        </li>
      </div>
    </div>
  );
};

export default Task;
