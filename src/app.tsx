import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { GlobalContextProvider, useGlobalContext } from "./context";

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
      <Routers />
    </GlobalContextProvider>
  );
}

const Routers = () => {

  const [state]: GlobalContextType = useGlobalContext()

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/app/*" element={<AppIndex />} />
      <Route path="/auth/*" element={state.authToken ? <Navigate to="/app/started" /> : <Auth />} />
    </Routes>
  )
}

export default App;
