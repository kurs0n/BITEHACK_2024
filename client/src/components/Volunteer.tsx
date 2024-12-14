import React from "react";

const Volunteer: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-stone-300">
      <h1 className="text-4xl font-bold mb-6 text-stone-800">Jestem Wolontariuszem</h1>
      <p className="text-lg text-stone-600">
        Dziękujemy za Twoją chęć pomocy! Tutaj znajdziesz narzędzia i instrukcje, aby wspierać seniorów.
      </p>
    </div>
  );
};

export default Volunteer;
