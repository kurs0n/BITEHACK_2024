// src/VolunteerHelp/Main.tsx
import React from "react";
import Container from "./Container";
import background from "../../public/background.png"; // Import the background image
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-stone-300"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link
        to="/senior"
        className="absolute top-6 left-6 text-stone-800 text-3xl p-4 bg-1 rounded-full shadow-lg border-2 border-stone-800 hover:bg-amber-50 transition"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <Container />
    </div>
  );
};

export default Main;
