import { createContext, useReducer } from "react";

export const DemandeAdoptionContext = createContext();

export const demandeAdoptionReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { ...state, demandes: action.payload };
    case "DELETE":
      return { ...state, deletedDemande: action.payload };
    case "STATUS":
      return { ...state, demandeStatus: action.payload };
    default:
      return state;
  }
};

export const DemandeAdoptionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(demandeAdoptionReducer, {
    demandes: null,
    demandeStatus: null,
    deletedDemande: null,
  });

  return (
    <DemandeAdoptionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DemandeAdoptionContext.Provider>
  );
};
