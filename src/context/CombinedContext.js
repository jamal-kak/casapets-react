import { createContext, useContext } from 'react';
import { AuthContext } from './authContext';
import { BoxsContext } from './boxsContext';
import { RacesContext } from './racesContext';
import { ReservationsContext } from './reservationsContext';

export const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
  const authContextValue = useContext(AuthContext);
  const racesContextValue = useContext(RacesContext);
  const boxsContextValue = useContext(BoxsContext);
  const reservationsContextValue = useContext(ReservationsContext);

  return (
    <CombinedContext.Provider value={{ ...authContextValue, ...racesContextValue, ...boxsContextValue, ...reservationsContextValue }}>
      {children}
    </CombinedContext.Provider>
  );
};