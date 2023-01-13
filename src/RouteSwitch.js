import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteIdentityPage from "./components/NoteIdentityPage";
import ScaleReferencePage from "./components/ScaleReferencePage";
const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteIdentityPage />} />
        <Route path="scales" element={<ScaleReferencePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
