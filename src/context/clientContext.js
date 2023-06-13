import { createContext, useReducer } from "react";

export const ClientContext = createContext();

export const clientReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { client: action.payload };
    case "AJOUTER":
      return { newClient: action.payload };
    case "MODIFIER":
      return { updatedClient: action.payload };
    case "DELETE":
      return { deletedClient: action.payload };
    default:
      return state;
  }
};

export const ClientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clientReducer, {
    client: null,
    newClient: null,
    deletedClient: null,
    updatedClient: null,
  });

  return (
    <ClientContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClientContext.Provider>
  );
};
