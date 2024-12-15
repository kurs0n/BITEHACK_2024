// src/VolunteerHelp/Modal.tsx
import React from "react";

interface ModalProps {
  volunteer: {
    name: string;
    surname: string;
    email: string;
    telephone_number: string;
    tags: string[];
    voivodeship: string;
    photo: string;
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ volunteer, onClose }) => {
  return (
    <div className="fixed inset-0 bg-trans flex justify-center items-center z-50">
      <div className="bg-1 p-8 rounded-xl max-w-xl w-full space-y-6 border-stone-800 border-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-800">
            {volunteer.name} {volunteer.surname}
          </h2>
          <button onClick={onClose} className="text-stone-800 font-semibold text-xl">
            X
          </button>
        </div>
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={volunteer.photo}
            alt={`${volunteer.name} ${volunteer.surname}`}
            className="w-32 h-32 rounded-full border-4 border-stone-800"
          />
          <div className="flex flex-col space-y-2">
            <p className="bg-trans p-2 rounded-md">
              <i className="fa-solid fa-hand-holding-heart mr-2 text-stone-800"></i>
              <strong className="font-semibold">Category:</strong> {volunteer.tags}
            </p>
            <p className="bg-trans p-2 rounded-md">
              <i className="fa-solid fa-envelope mr-2 text-stone-800"></i>
              <strong className="font-semibold">Email:</strong>{" "}
              <a href={`mailto:${volunteer.email}`} className="text-blue-500 hover:underline">
                {volunteer.email}
              </a>
            </p>
            <p className="bg-trans p-2 rounded-md">
              <i className="fa-solid fa-phone-alt mr-2 text-stone-800"></i>
              <strong className="font-semibold">Phone Number:</strong> {volunteer.telephone_number}
            </p>
            <p className="bg-trans p-2 rounded-md">
              <i className="fa-solid fa-map-marker-alt mr-2 text-stone-800"></i>
              <strong className="font-semibold">Voivodeship:</strong> {volunteer.voivodeship}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
