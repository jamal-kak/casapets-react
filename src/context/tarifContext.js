import { createContext, useReducer } from "react";

export const TarifContext = createContext();

export const tarifReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { tarifs: action.payload };
    case "DETAIL":
      return { detailTarif: action.payload };
    case "AJOUTER":
      return { newTarif: action.payload };
    case "MODIFIER":
      return { updatedTarif: action.payload };
    case "DELETE":
      return { deletedTarif: action.payload };
    default:
      return state;
  }
};

export const TarifContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tarifReducer, {
    tarifs: null,
    detailTarif: null,
    newTarif: null,
    updatedTarif: null,
    deletedTarif: null,
  });

  return (
    <TarifContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TarifContext.Provider>
  );
};
