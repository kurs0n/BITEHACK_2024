import { InstructionProvider } from "./TechnicalHelp/Context";
import Container from "./TechnicalHelp/Container";

function App() {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-400">
      <InstructionProvider>
        <Container />
      </InstructionProvider>
    </div>
  );
}

export default App;
