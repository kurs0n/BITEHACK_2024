// src/VolunteerHelp/Container.tsx
import React, { useState, useEffect } from "react";
import InputBar from "./InputBar";
import VolunteerList from "./VolunteerList";

const Container: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Example of simulating a loading state for demonstration purposes
    const timer = setTimeout(() => setIsLoading(false), 1500); // Hide loading after 1.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" h-full bg-trans p-20 w-3/4 backdrop-blur-lg">
      <div className="flex mb-12">
        {/* Left Column (Title and InputBar) */}
        <div className="w-1/2 pr-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center mb-12">Znajdź Wolontariusza</h1>
          <InputBar setIsLoading={setIsLoading} />
        </div>

        {/* Right Column (VolunteerList) */}
        <div className="w-1/2 pl-4">
          <div className="bg-main p-6 rounded-3xl space-y-4">
            <div className="flex justify-center items-center space-x-2">
              {isLoading ? (
                <div className="h-96 overflow-y-auto p-4 rounded-xl w-full">
                  <div className="flex justify-center items-center h-full text-stone-400 text-lg">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </div>
                </div>
              ) : (
                <VolunteerList />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
