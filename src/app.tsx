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
      {state.authToken ? (
        <>
          <Route path="/app/*" element={<AppIndex />} />
          <Route path="/*" element={<Home />} />
          <Route path="/auth/*" element={<Navigate to="/app/started" />}/>
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<Auth />}/>
          <Route path="/*" element={<Home />} />
          <Route path="/app/*" element={<Navigate to="/auth/sign-in" />} />
        </>
      )}
    </Routes>
  )
}

export default App;
