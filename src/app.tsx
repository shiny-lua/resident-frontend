import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { GlobalContextProvider } from "./context";

import Home from "./pages/home";
import Auth from "./pages/auth";
import AppIndex from "./pages/app";

function App() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<Home />} />
        <Route path="/app/*" element={<AppIndex />} />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
