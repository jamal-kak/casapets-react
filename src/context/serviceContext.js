import { createContext, useReducer } from "react";

export const ServiceContext = createContext();

export const serviceReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { services: action.payload };
    case "DETAIL":
      return { detailService: action.payload };
    case "AJOUTER":
      return { newService: action.payload };
    case "MODIFIER":
      return { updatedService: action.payload };
    case "DELETE":
      return { deletedService: action.payload };
    default:
      return state;
  }
};

export const ServiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, {
    services: null,
    detailService: null,
    newService: null,
    updatedService: null,
    deletedService: null,
  });

  return (
    <ServiceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
};
