import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { RacesContextProvider } from "./context/racesContext";
import { BoxsContextProvider } from "./context/boxsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RacesContextProvider>
      <BoxsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BoxsContextProvider>
      </RacesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
