import React from "react";
import { Link } from "react-router-dom";
import background from "../../public/background.png"; // Replace with the correct path to your background image

const TitlePage: React.FC = () => {
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center text-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-5xl font-bold mb-12 text-stone-800">Kim jesteś?</h1>
      <div className="flex space-x-8">
        <Link
          to="/senior"
          className="px-8 py-4 bg-lime-300 text-stone-800 rounded-xl shadow-lg hover:bg-lime-400 transition"
        >
          Seniorem szukającym wsparcia
        </Link>
        <Link
          to="/volunteer"
          className="px-8 py-4 bg-lime-300 text-stone-800 rounded-xl shadow-lg hover:bg-lime-400 transition"
        >
          Wolontariuszem chcącym pomóc
        </Link>
      </div>
    </div>
  );
};

export default TitlePage;
