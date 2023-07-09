import { createContext, useReducer } from "react";

export const DashContext = createContext();

export const dashReducer = (state, action) => {
  switch (action.type) {
    case "CLIENT":
      return { ...state, dashClient: action.payload };
    case "VET":
      return { ...state, dashVet: action.payload };
    case "PET":
      return { ...state, dashPet: action.payload };
    case "RESERVATION":
      return { ...state, dashRes: action.payload };
    case "FACTURE":
      return { ...state, dashFacture: action.payload };
    case "FACTURE_T":
      return { ...state, dashFactureTable: action.payload };
    case "ETAT_FACTURE":
      return { ...state, dashEtatFacture: action.payload };
    case "RDV":
      return { ...state, dashRdv: action.payload };
    case "ADOPTION":
      return { ...state, dashAdoption: action.payload };
    default:
      return state;
  }
};

export const DashContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashReducer, {
    dashClient: null,
    dashPet: null,
    dashVet: null,
    dashRes: null,
    dashFacture: null,
    dashRdv: null,
    dashFactureTable: null,
    dashEtatFacture: null,
    dashAdoption: null,
  });

  return (
    <DashContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DashContext.Provider>
  );
};
