// src/VolunteerHelp/Container.tsx
import React, { useState } from "react";
import InputBar from "./InputBar";
import VolunteerList from "./VolunteerList";

const Container: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  return (
    <div className="h-full bg-trans pr-20 pl-20 w-3/4 backdrop-blur-lg">
      <div className="flex mb-12 h-screen flex flex-row items-center">
        <div className="w-1/2 pr-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center mb-12">Znajdź Wolontariusza</h1>
          <InputBar setIsLoading={setIsLoading} setVolunteers={setVolunteers} />
        </div>

        <div className="w-1/2 pl-4 h-full pt-10 pb-5">
          <div className="bg-main p-6 rounded-3xl space-y-4 h-full">
            <div className="flex justify-center items-center space-x-2 h-full">
              {isLoading ? (
                <div className="h-96 overflow-y-auto p-4 rounded-xl w-full h-full">
                  <div className="flex justify-center items-center h-full text-stone-400 text-lg">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </div>
                </div>
              ) : (
                <VolunteerList volunteers={volunteers} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
