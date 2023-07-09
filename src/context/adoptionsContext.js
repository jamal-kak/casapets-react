import { createContext, useReducer } from "react";

export const AdoptionsContext = createContext();

export const adoptionsReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { ...state, adoption: action.payload };
    case "DETAIL":
      return { ...state, detailAdoption: action.payload };
    case "AJOUTER":
      return { ...state, newAdoption: action.payload };
    case "MODIFIER":
      return { ...state, updatedAdoption: action.payload };
    case "DELETE":
      return { ...state, deletedAdoption: action.payload };
    default:
      return state;
  }
};

export const AdoptionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adoptionsReducer, {
    adoption: null,
    newAdoption: null,
    updatedAdoption: null,
    deletedAdoption: null,
    detailAdoption: null,
  });

  return (
    <AdoptionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdoptionsContext.Provider>
  );
};
