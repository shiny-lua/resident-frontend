import React from "react";

import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home";
import { GlobalContextProvider } from "./context";

function App() {

  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
