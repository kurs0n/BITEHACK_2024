import React from "react";
import VolunteerSignUpForm from "./VolounterSignUpForms";
import { Link } from "react-router-dom";

const VolunteerSignUpContainer: React.FC = () => {
  return (
    <div className="bg-trans flex flex-col justify-center items-center w-full h-full px-4 sm:px-6 md:px-8">
      <Link
        to="/"
        className="absolute top-6 left-6 text-stone-800 text-3xl p-4 bg-1 rounded-full shadow-lg border-2 border-stone-800 hover:bg-amber-50 transition hidden lg:block"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <p className="text-lg text-stone-600 text-center max-w-2xl font-bold mb-4">
        Dziękujemy za gotowość do pomocy seniorom!
      </p>
      <div className="mt-8"></div>
      <VolunteerSignUpForm />
      <p className="text-lg text-stone-500 text-center max-w-2xl mt-12">
        Prosimy o wypełnienie powyższego formularza. Gdy Twoje wsparcie będzie potrzebne, senior skontaktuje się z Tobą.
      </p>
    </div>
  );
};

export default VolunteerSignUpContainer;
