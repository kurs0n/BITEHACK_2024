// src/VolunteerHelp/VolunteerList.tsx
import React, { useState } from "react";
import Volunteer from "./Volunteer";
import Modal from "./Modal";

type Volunteer = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  category: string;
  voivodeship: string;
  photoUrl: string;
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
    <div className="w-full">
      {volunteers.length === 0 ? (
        <p className="text-stone-400">Brak wyników</p>
      ) : (
        <ul>
          {volunteers.map((volunteer) => (
            <li key={volunteer.id} className="mb-4 cursor-pointer" onClick={() => handleVolunteerClick(volunteer)}>
              <Volunteer
                name={volunteer.name}
                surname={volunteer.surname}
                email={volunteer.email}
                phoneNumber={volunteer.phoneNumber}
                category={volunteer.category}
                voivodeship={volunteer.voivodeship}
                photoUrl={volunteer.photoUrl}
              />
            </li>
          ))}
        </ul>
      )}

      {selectedVolunteer && <Modal volunteer={selectedVolunteer} onClose={closeModal} />}
    </div>
  );
};

export default VolunteerList;
