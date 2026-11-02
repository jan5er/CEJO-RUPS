import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router";
import { createRoot } from "react-dom/client";
import Level1 from "./level1/Level1.jsx";
import Level2 from "./level2/Level2.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="level">
        <Route path="1" element={<Level1 />} />
        <Route path="2" element={<Level2 />} />
      </Route>
      <Route index element={<Navigate to="/level/1" replace />} />
      <Route path="*" element={<Navigate to="/level/1" replace />} />
    </Routes>
  </BrowserRouter>
);
