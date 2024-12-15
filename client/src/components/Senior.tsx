import React from "react";
import { Link } from "react-router-dom";
import background from "../../public/background.png"; // Import the background image

const Senior: React.FC = () => {
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-stone-300"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link
        to="/"
        className="absolute top-6 left-6 text-stone-800 text-3xl p-4 bg-1 rounded-full shadow-lg border-2 border-stone-800 hover:bg-amber-50 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      <h1 className="text-6xl font-bold mb-32 text-stone-800">Pomoc dla Seniorów</h1>
      <div className="flex space-x-64 font-bold text-4xl">
        <Link
          to="/tech-help"
          className="px-8 py-20 bg-lime-200 text-stone-800 rounded-3xl border-amber-50 border-4 hover:border-stone-800 transition"
        >
          Pomoc Technologiczna
          <div className="flex justify-center items-center mt-12">
            <i className="fa-solid fa-mobile-screen-button fa-xl animate-pulse"></i>
          </div>{" "}
        </Link>
        <Link
          to="/volunteer-help"
          className="px-8 py-20 bg-orange-200 text-stone-800 rounded-3xl border-amber-50 border-4 hover:border-stone-800 transition"
        >
          Pomoc Wolontariusza
          <div className="flex justify-center items-center mt-12">
            <i className="fa-solid fa-hand-holding-hand fa-xl animate-pulse"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Senior;
