// src/VolunteerHelp/VolunteerList.tsx
import React, { useState } from "react";
import Volunteer from "./Volunteer";
import Modal from "./Modal";

type Volunteer = {
  id: number;
  name: string;
  surname: string;
  email: string;
  telephone_number: string;
  tags: string[];
  voivodeship: string;
  photo: string;
};

type VolunteerListProps = {
  volunteers: Volunteer[];
};

const VolunteerList: React.FC<VolunteerListProps> = ({ volunteers }) => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

  return (
    <div className="w-full h-full">
      {volunteers.length === 0 ? (
        <div className="flex justify-center items-center h-full text-stone-400 text-lg">
          <p className="text-stone-400">Brak wyników</p>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-full">
          <ul>
            {volunteers.map((volunteer) => (
              <li
                key={volunteer.id}
                className="mb-4 cursor-pointer"
                onClick={() => handleVolunteerClick(volunteer)}
              >
                <Volunteer
                  name={volunteer.name}
                  surname={volunteer.surname}
                  email={volunteer.email}
                  phone_number={volunteer.telephone_number}
                  tags={volunteer.tags.join(' ')}
                  voivodeship={volunteer.voivodeship}
                  photo={volunteer.photo}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedVolunteer && <Modal volunteer={selectedVolunteer} onClose={closeModal} />}
    </div>
  );
};

export default VolunteerList;
