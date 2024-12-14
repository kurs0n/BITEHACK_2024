import "regenerator-runtime/runtime";
import { InstructionProvider } from "./TechnicalHelp/Context";
import Container from "./TechnicalHelp/Container";
import background from "../public/background.png"; // Import the image

function App() {
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
      <InstructionProvider>
        <Container />
      </InstructionProvider>
    </div>
  );
}

export default App;
