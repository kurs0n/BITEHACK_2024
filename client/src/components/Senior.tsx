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
      <h1 className="text-6xl font-bold mb-32 text-stone-800 ]">Pomoc dla Seniorów</h1>
      <div className="flex space-x-64 font-bold text-2xl">
        <Link
          to="/tech-help"
          className="px-8 py-12 bg-lime-200 text-stone-800 rounded-3xl border-stone-800 border-4 hover:bg-lime-300 transition"
        >
          Pomoc Technologiczna
          <div className="flex justify-center items-center mt-8">
            <i className="fa-solid fa-mobile-screen-button fa-xl animate-pulse"></i>
          </div>{" "}
        </Link>
        <Link
          to="/volunteer-help"
          className="px-8 py-12 bg-orange-200 text-stone-800 rounded-3xl border-stone-800 border-4 hover:bg-orange-300 transition"
        >
          Pomoc Wolontariusza
          <div className="flex justify-center items-center mt-8">
            <i className="fa-solid fa-hand-holding-hand fa-xl animate-pulse"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Senior;
