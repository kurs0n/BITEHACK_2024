import React from "react";
import { Link } from "react-router-dom";

const Senior: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-stone-300">
      <h1 className="text-4xl font-bold mb-6 text-stone-800">Pomoc dla Seniorów</h1>
      <div className="flex space-x-6">
        <Link
          to="/tech-help"
          className="px-8 py-4 bg-lime-300 text-stone-800 rounded-xl shadow-lg hover:bg-lime-400 transition"
        >
          Pomoc Technologiczna
        </Link>
        <Link
          to="/volunteer-help"
          className="px-8 py-4 bg-lime-300 text-stone-800 rounded-xl shadow-lg hover:bg-lime-400 transition"
        >
          Pomoc Wolontariusza
        </Link>
      </div>
    </div>
  );
};

export default Senior;
