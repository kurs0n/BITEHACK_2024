import React, { useState } from "react";

type TaskProps = {
  index: number;
  description: string;
  icon?: string;
};

const Task: React.FC<TaskProps> = ({ index, description, icon }) => {
  const [detailedStep, setDetailedStep] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTaskClick = async () => {
    if (detailedStep === null) {
      try {
        const body = JSON.stringify({
          prompt: description,
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
        }
      } catch (error) {
        console.error("Error fetching detailed step:", error);
      }
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group">
      <span className="text-sm text-stone-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Kliknij by uzyskac wiecej informacji
      </span>
      <li
        className={`flex flex-col items-start bg-1 p-2 pl-6 border-stone-800 border-l-4 rounded-r-xl w-fit transition-all duration-300 ${
          isExpanded ? "w-full" : "w-fit"
        }`}
        onClick={handleTaskClick}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-semibold text-stone-800 mr-4">{index}.</span>
          <span>{description}</span>
          {icon && <img src={icon} alt={`icon-${index}`} className="h-12 rounded-xl" />}
        </div>
        {isExpanded && detailedStep && (
          <div className="text-stone-600 mx-12 my-3 py-4 border-t-2 border-stone-800">{detailedStep}</div>
        )}
      </li>
    </div>
  );
};

export default Task;
