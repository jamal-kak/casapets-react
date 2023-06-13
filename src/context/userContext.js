import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "AJOUTER":
      return { users: action.payload };
    case "AFFICHER":
      return { users: action.payload };
    case "SUPPRIMER":
      return { users: action.payload };
    case "MODIFIER":
      return { users: action.payload };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { users: null });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
