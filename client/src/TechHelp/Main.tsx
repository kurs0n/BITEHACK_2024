import React from "react";
import Container from "./Container";
import background from "../../public/background.png"; // Import the background image

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
      <Container />
    </div>
  );
};

export default Main;
