import React from "react";
import { Link } from "react-router-dom";
import background from "../../public/background.png"; // Import the background image

const TitlePage: React.FC = () => {
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
      <h1 className="text-6xl font-bold mb-32 text-stone-800 text-center">Kim jesteś?</h1>
      <div className="flex space-x-64 font-bold text-2xl">
        <Link
          to="/senior"
          className="px-8 py-20 bg-1 text-stone-800 rounded-3xl border-amber-50 border-4 hover:border-stone-800 transition"
        >
          Seniorem szukającym wsparcia
          <div className="flex justify-center items-center mt-4">
            <i className="fa-solid fa-computer-mouse text-2xl animate-pulse"></i>
          </div>
        </Link>
        <Link
          to="/volunteer-signup"
          className="px-8 py-20 bg-1 text-stone-800 rounded-3xl border-amber-50 border-4 hover:border-stone-800 transition"
        >
          Wolontariuszem chcącym pomóc
          <div className="flex justify-center items-center mt-4">
            <i className="fa-solid fa-computer-mouse text-2xl animate-pulse"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TitlePage;
