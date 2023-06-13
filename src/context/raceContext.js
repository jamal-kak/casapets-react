import { createContext, useReducer } from "react";

export const RaceContext = createContext();

export const raceReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { races: action.payload };
    case "DETAIL":
      return { detailRace: action.payload };
    case "AJOUTER":
      return { newRace: action.payload };
    case "MODIFIER":
      return { updatedRace: action.payload };
    case "DELETE":
      return { deletedRace: action.payload };
    default:
      return state;
  }
};

export const RaceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(raceReducer, {
    races: null,
    detailRace: null,
    newRace: null,
    updatedRace: null,
    deletedRace: null,
  });

  return (
    <RaceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RaceContext.Provider>
  );
};
