import 'regenerator-runtime/runtime';
import { InstructionProvider } from "./TechnicalHelp/Context";
import Container from "./TechnicalHelp/Container";
import background from "./assets/background.png";

function App() {
  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-stone-300"
      style={{
        backgroundImage: background, // Path to your image in the assets folder
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
      }}
    >
      <InstructionProvider>
        <Container />
      </InstructionProvider>
    </div>
  );
}

export default App;
