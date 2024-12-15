// src/VolunteerHelp/VolunteerList.tsx
import React, { useState } from "react";
import Volunteer from "./Volunteer";
import Modal from "./Modal";

const volunteers = [
  {
    name: "Jan",
    surname: "Kowalski",
    email: "jan.kowalski@example.com",
    phoneNumber: "123-456-789",
    category: "Pomoc przy zakupach",
    voivodeship: "Mazowieckie",
    photoUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Anna",
    surname: "Nowak",
    email: "anna.nowak@example.com",
    phoneNumber: "987-654-321",
    category: "Wizyty towarzyskie",
    voivodeship: "Małopolskie",
    photoUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Piotr",
    surname: "Zieliński",
    email: "piotr.zielinski@example.com",
    phoneNumber: "456-789-012",
    category: "Pomoc w nauce",
    voivodeship: "Śląskie",
    photoUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Kasia",
    surname: "Wójcik",
    email: "kasia.wojcik@example.com",
    phoneNumber: "321-654-987",
    category: "Spacer z seniorem",
    voivodeship: "Dolnośląskie",
    photoUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Michał",
    surname: "Nowicki",
    email: "michal.nowicki@example.com",
    phoneNumber: "654-321-987",
    category: "Pomoc przy zakupach",
    voivodeship: "Wielkopolskie",
    photoUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Julia",
    surname: "Kaczmarek",
    email: "julia.kaczmarek@example.com",
    phoneNumber: "789-123-456",
    category: "Wizyty towarzyskie",
    voivodeship: "Pomorskie",
    photoUrl: "https://i.pravatar.cc/150?img=6",
  },
];

const VolunteerList: React.FC = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const handleVolunteerClick = (volunteer: any) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Lista pomocy</h2>
      <div className="max-h-[70vh] overflow-y-auto">
        <ul className="space-y-4">
          {volunteers.map((volunteer, index) => (
            <li
              key={index}
              s
              onClick={() => handleVolunteerClick(volunteer)}
              className="cursor-pointer bg-1 p-4 rounded-lg flex items-center space-x-4 hover:scale-95 transition-all duration-150"
            >
              <img
                src={volunteer.photoUrl}
                alt={`${volunteer.name} ${volunteer.surname}`}
                className="w-16 h-16 rounded-full border-2 border-stone-800"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-user text-stone-800"></i>
                  <span className="font-semibold">
                    {volunteer.name} {volunteer.surname}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <i className="fa-solid fa-hand-holding-heart text-stone-800"></i>
                  <span>{volunteer.category}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <i className="fa-solid fa-phone-alt text-stone-800"></i>
                  <span>{volunteer.phoneNumber}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-map-marker-alt text-stone-800"></i>
                <span>{volunteer.voivodeship}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedVolunteer && <Modal volunteer={selectedVolunteer} onClose={closeModal} />}
    </div>
  );
};

export default VolunteerList;
