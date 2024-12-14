import { InstructionProvider } from "./TechnicalHelp/Context";
import Container from "./TechnicalHelp/Container";
import background from "../public/background.png"; // Import the image

function App() {
  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-stone-300"
      style={{
        backgroundImage: `url(${background})`, // Apply the background image correctly
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
      <InstructionProvider>
        <Container />
      </InstructionProvider>
    </div>
  );
}

export default App;
