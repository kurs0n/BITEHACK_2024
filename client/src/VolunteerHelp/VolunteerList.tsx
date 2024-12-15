// src/VolunteerHelp/VolunteerList.tsx
import React from "react";

type Volunteer = {
  id: number;
  name: string;
  city: string;
  voivodeship: string;
  type: string;
};

type VolunteerListProps = {
  volunteers: Volunteer[];
};

const VolunteerList: React.FC<VolunteerListProps> = ({ volunteers }) => {
  return (
    <div className="w-full">
      {volunteers.length === 0 ? (
        <p className="text-stone-400">Brak wyników</p>
      ) : (
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer.id} className="bg-main p-4 rounded-lg mb-4 shadow-md">
              <h3 className="text-xl font-semibold">{volunteer.name}</h3>
              <p>
                {volunteer.city}, {volunteer.voivodeship}
              </p>
              <p>{volunteer.type}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VolunteerList;
