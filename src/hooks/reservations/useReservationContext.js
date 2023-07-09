import { ReservationContext } from "../../context/reservationContext";
import { useContext } from "react";

export const useReservationContext = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw Error(
      "useReservationContext must be used inside an ReservationContextProvider"
    );
  }

  return context;
};
