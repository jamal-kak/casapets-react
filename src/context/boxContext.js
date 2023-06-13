import { createContext, useReducer } from "react";

export const BoxContext = createContext();

export const boxReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { boxs: action.payload };
    case "DETAIL":
      return { detailBox: action.payload };
    case "AJOUTER":
      return { newBox: action.payload };
    case "MODIFIER":
      return { updatedBox: action.payload };
    case "DELETE":
      return { deletedBox: action.payload };
    default:
      return state;
  }
};

export const BoxContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boxReducer, {
    boxs: null,
    detailBox: null,
    newBox: null,
    updatedBox: null,
    deletedBox: null,
  });

  return (
    <BoxContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BoxContext.Provider>
  );
};
