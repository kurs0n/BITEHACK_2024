import React from "react";
import VolunteerSignUoForms from "./VolounterSignUpForms";
import { Link } from "react-router-dom";

const VolunteerSignUpContainer: React.FC = () => {
  return (
    <div className="bg-trans flex flex-col justify-center items-center bg-stone-300">
      <Link
        to="/"
        className="absolute top-6 left-6 text-stone-800 text-3xl p-4 bg-1 rounded-full shadow-lg border-2 border-stone-800 hover:bg-amber-50 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h1 className="text-4xl font-bold mb-6 text-stone-800">Pomoc Wolontariusza</h1>
      <p className="text-lg text-stone-600 text-center max-w-2xl font-bold">
        Dziękujemy za gotowość do pomocy seniorom!
      </p>
      <p className="text-lg text-stone-600 text-center max-w-2xl">
        Prosimy o wypełnienie poniższego formularza. Gdy Twoje wsparcie będzie potrzebne, senior skontaktuje się z Tobą.
      </p>
      <div className="mt-8"></div>
      <VolunteerSignUoForms />
    </div>
  );
};

export default VolunteerSignUpContainer;
