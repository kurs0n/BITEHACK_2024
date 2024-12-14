import React, { useState } from "react";

type TaskProps = {
  index: number;
  description: string;
  icon?: string; // Add the icon as an optional prop
};

const Task: React.FC<TaskProps> = ({ index, description, icon }) => {
  const [detailedStep, setDetailedStep] = useState<string | null>(null);

  const handleTaskClick = async () => {
    try {
      // Create the request body
      const body = JSON.stringify({
        prompt: description, // You can send more data here if needed
      });

      const response = await fetch("http://localhost:3000/detailed-step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.text();
        setDetailedStep(data);
        console.error("Failed to fetch detailed step");
      }
    } catch (error) {
      console.error("Error fetching detailed step:", error);
    }
  };

  return (
    <div className="group">
      <span className="text-sm text-stone-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Kliknij by uzyskac wiecej informacji
      </span>
      <li
        className="flex flex-col items-start bg-1 p-2 pl-6 border-stone-800 border-l-4 rounded-r-xl w-fit"
        onClick={handleTaskClick}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-semibold text-stone-800 mr-4">{index}.</span>
          <span>{description}</span>
          {icon && <img src={icon} alt={`icon-${index}`} className="h-12 rounded-xl" />}
        </div>
      </li>
      {detailedStep && (
        <div className="mt-2 p-4 text-sm text-gray-700 bg-gray-100 rounded-md">
          {detailedStep} {/* Display the detailed step under the task */}
        </div>
      )}
    </div>
  );
};

export default Task;
