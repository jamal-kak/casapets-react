import { createContext, useReducer } from "react";

export const ReservationContext = createContext();

export const reservationReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { ...state, reservations: action.payload };
    case "DETAIL":
      return { ...state, detailReservation: action.payload };
    case "AJOUTER":
      return { ...state, newReservation: action.payload };
    case "MODIFIER":
      return { ...state, updatedReservation: action.payload };
    case "DELETE":
      return { ...state, deletedReservation: action.payload };
    case "STATUS":
      return { ...state, statusRes: action.payload };
    default:
      return state;
  }
};

export const ReservationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, {
    reservations: null,
    detailReservation: null,
    newReservation: null,
    updatedReservation: null,
    deletedReservation: null,
    statusRes: null,
  });

  return (
    <ReservationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};
