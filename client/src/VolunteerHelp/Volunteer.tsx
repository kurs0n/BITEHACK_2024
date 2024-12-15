// src/VolunteerHelp/Volunteer.tsx
import React from "react";

interface VolunteerProps {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  tags: string;
  voivodeship: string;
  photo: string;
}

const Volunteer: React.FC<VolunteerProps> = ({
  name,
  surname,
  email,
  phone_number,
  tags,
  voivodeship,
  photo,
}) => {
  return (
    <div className="flex items-center space-x-4 bg-1 p-4 rounded-xl shadow-md">
      <img src={photo} alt="Volunteer" className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-stone-800">
          {name} {surname}
        </h3>
        <p className="text-sm text-stone-600">Email: {email}</p>
        <p className="text-sm text-stone-600">Phone: {phone_number}</p>
        <p className="text-sm text-stone-600">Category: {tags}</p>
        <p className="text-sm text-stone-600">Voivodeship: {voivodeship}</p>
      </div>
    </div>
  );
};

export default Volunteer;
