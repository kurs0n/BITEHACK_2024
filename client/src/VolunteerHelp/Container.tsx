import React from "react";

const VolunteerHelpContainer: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-stone-300">
      <h1 className="text-4xl font-bold mb-6 text-stone-800">Pomoc Wolontariusza</h1>
      <p className="text-lg text-stone-600 text-center max-w-2xl">
        Tutaj znajdziesz wszystkie niezbędne informacje i materiały, aby pomóc seniorom w potrzebie. Możesz skorzystać z
        naszego przewodnika, aby rozpocząć swoją przygodę z wolontariatem!
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-lime-300 text-stone-800 rounded-lg shadow hover:bg-lime-400 transition">
          Rozpocznij
        </button>
      </div>
    </div>
  );
};

export default VolunteerHelpContainer;
