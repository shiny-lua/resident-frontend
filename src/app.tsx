import React from "react";

import {
  Route,
  Routes,
} from "react-router-dom";

import { GlobalContextProvider } from "./context";

import Home from "./pages/home";
import Auth from "./pages/auth";
import AppIndex from "./pages/app";

function App() {

  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/*" element={<Auth/>} />
        <Route path="/" element={<Home />} />
        <Route path="/app/*" element={<AppIndex />} />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
