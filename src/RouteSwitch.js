import { HashRouter, Routes, Route } from "react-router-dom";
import NoteIdentityPage from "./components/NoteIdentityPage";
import ScaleReferencePage from "./components/ScaleReferencePage";
const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<NoteIdentityPage />} />
        <Route path="scales" element={<ScaleReferencePage />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
