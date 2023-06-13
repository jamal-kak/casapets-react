import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import SignIn from "./scenes/signIn/Signin";
import Users from "./scenes/users";
import Clients from "./scenes/clients";
import Pets from "./scenes/pets";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { useAuthContext } from "./hooks/useAuthContext";

import FormUser from "./scenes/users/FormUser";
import FormClient from "./scenes/clients/FormClient";
import FormPet from "./scenes/pets/FormPets";
import Vets from "./scenes/veterinaire";
import FormVet from "./scenes/veterinaire/FormVet";
import Boxs from "./scenes/box";
import FormBox from "./scenes/box/FormBox";
import Races from "./scenes/race";
import FormRace from "./scenes/race/FormRace";
import Services from "./scenes/service";
import FormService from "./scenes/service/FormService";
import Tarifs from "./scenes/tarif";
import FormTarif from "./scenes/tarif/FormTarif";


function App() {
  const { user, isLoading } = useAuthContext();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Determine if the current route is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {!isLoading && (
          <div className="app">
            {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route
                  path="/"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!user ? <SignIn /> : <Navigate to="/" />}
                />
                <Route
                  path="/users"
                  element={
                    user && user?.user?.role_id === 1 ? (
                      <Users />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/add-user"
                  element={
                    user && user?.user?.role_id === 1 ? (
                      <FormUser />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/clients"
                  element={user ? <Clients /> : <Navigate to="/login" />}
                />

                <Route
                  path="/clients/add-client"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormClient />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/clients/update-client/:id"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormClient />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/pets"
                  element={user ? <Pets /> : <Navigate to="/login" />}
                />

                <Route
                  path="/pets/add-pet"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormPet />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/pets/update-pet/:id"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormPet />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/vet"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <Vets />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/vet/add-vet"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormVet />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/vet/update-vet/:id"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormVet />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/boxs"
                  element={user ? <Boxs /> : <Navigate to="/login" />}
                />

                <Route
                  path="/races"
                  element={user ? <Races /> : <Navigate to="/login" />}
                />
                <Route
                  path="/races/add-race"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormRace />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/races/update-race/:id"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormRace />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/services"
                  element={user ? <Services /> : <Navigate to="/login" />}
                />

                <Route
                  path="/services/add-service"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormService />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/services/update-service/:id"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormService />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/tarifs"
                  element={user ? <Tarifs /> : <Navigate to="/login" />}
                />

                <Route
                  path="/tarifs/add-tarif"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormTarif />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/tarifs/update-tarif/:id"
                  element={
                    user && user?.user?.role_id !== 2 ? (
                      <FormTarif />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </main>
          </div>
        )}

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
