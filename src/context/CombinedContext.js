import { createContext, useContext } from 'react';
import { AuthContext } from './authContext';
import { BoxsContext } from './boxsContext';
import { RacesContext } from './racesContext';

export const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
  const authContextValue = useContext(AuthContext);
  const racesContextValue = useContext(RacesContext);
  const boxsContextValue = useContext(BoxsContext);

  return (
    <CombinedContext.Provider value={{ ...authContextValue, ...racesContextValue, ...boxsContextValue }}>
      {children}
    </CombinedContext.Provider>
  );
};