import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Level1 from "./level1/Level1.jsx";
import Level2 from "./level2/Level2.jsx";
import Level3 from "./level3/Level3.jsx";
import Level4 from "./level4/Level4.jsx";
import Level5 from "./level5/Level5.jsx";
import Level6 from "./level6/Level6.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="level">
        <Route path="1" element={<Level1 />} />
        <Route path="2" element={<Level2 />} />
        <Route path="3" element={<Level3 />} />
        <Route path="4" element={<Level4 />} />
        <Route path="5" element={<Level5 />} />
        <Route path="6" element={<Level6 />} />
      </Route>
      <Route index element={<Navigate to="/level/1" replace />} />
      <Route path="*" element={<Navigate to="/level/1" replace />} />
    </Routes>
  </BrowserRouter>,
);
