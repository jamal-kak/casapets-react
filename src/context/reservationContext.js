import { createContext, useReducer } from "react";

export const ReservationContext = createContext();

export const reservationReducer = (state, action) => {
  switch (action.type) {
    case "AFFICHER":
      return { reservations: action.payload };
    case "DETAIL":
      return { detailReservation: action.payload };
    case "AJOUTER":
      return { newReservation: action.payload };
    case "MODIFIER":
      return { updatedReservation: action.payload };
    case "DELETE":
      return { deletedReservation: action.payload };
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
  });

  return (
    <ReservationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};
