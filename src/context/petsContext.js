import { createContext, useReducer } from "react";

export const PetsContext = createContext();

export const petsReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { pet: action.payload };
    case "DETAIL":
      return { detailPet: action.payload };
    case "AJOUTER":
      return { newPet: action.payload };
    case "MODIFIER":
      return { updatedPet: action.payload };
    case "DELETE":
      return { deletedPet: action.payload };
    default:
      return state;
  }
};

export const PetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(petsReducer, {
    pet: null,
    newPet: null,
    updatedPet: null,
    deletedPet: null,
    detailPet: null,
  });

  return (
    <PetsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PetsContext.Provider>
  );
};
