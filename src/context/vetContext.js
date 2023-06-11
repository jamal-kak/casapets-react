import { createContext, useReducer } from "react";

export const VetContext = createContext();

export const vetReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { veterinaire: action.payload };
    case "AJOUTER":
      return { NewVeterinaire: action.payload };
    case "MODIFIER":
      return { updatedVeterinaire: action.payload };
    case "DELETE":
      return { deletedVeterinaire: action.payload };
    default:
      return state;
  }
};

export const VetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vetReducer, {
    veterinaire: null,
    updatedVeterinaire: null,
    NewVeterinaire: null,
    deletedVeterinaire: null,
  });

  return (
    <VetContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VetContext.Provider>
  );
};
