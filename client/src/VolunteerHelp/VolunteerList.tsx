// src/VolunteerHelp/VolunteerList.tsx
import React from "react";

const volunteerRequests = [
  "Pomoc przy zakupach",
  "Wizyty towarzyskie",
  "Pomoc w nauce",
  "Spacer z seniorem",
  "AAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAA",
];

const VolunteerList: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Lista pomocy</h2>
      <div className="max-h-[70vh] overflow-y-auto">
        {" "}
        {/* Add max-height and overflow */}
        <ul className="space-y-4">
          {volunteerRequests.map((request, index) => (
            <li key={index} className="bg-stone-200 p-4 rounded-xl shadow-md">
              {request}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerList;
