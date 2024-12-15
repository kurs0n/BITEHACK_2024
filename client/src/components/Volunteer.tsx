import React from "react";
import Container from "../VolounterSignUp/Container";
import background from "../../public/background.png";

const Volunteer: React.FC = () => {
  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-stone-300 px-0"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container />
    </div>
  );
};

export default Volunteer;
