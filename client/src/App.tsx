import "regenerator-runtime/runtime";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TitlePage from "./components/TitlePage";
import Senior from "./components/Senior";
import Volunteer from "./components/Volunteer";
import TechHelp from "./TechHelp/Main";
import VolunteerHelpContainer from "./VolunteerHelp/Container";
import { InstructionProvider } from "./TechHelp/Context";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/senior" element={<Senior />} />
        <Route path="/volunteer-signup" element={<Volunteer />} />
        <Route
          path="/tech-help"
          element={
            <InstructionProvider>
              <TechHelp />
            </InstructionProvider>
          }
        />

        <Route path="/volunteer-help" element={<VolunteerHelpContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
