import { useState } from "react";
import { useReservationContext } from "./useReservationContext";
import axios from "axios";
import { RESERVATION_API_URL, RESERVATION_API_URL_LIST } from "../../utils/APIS";

export const useListReservations = () => {
  const [isLoadingListReservations, setIsLoadingListReservations] = useState(null);
  const { dispatch } = useReservationContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listReservations = async (minimal = false) => {
    setIsLoadingListReservations(true);

    try {
      const response = await axios.get(
        minimal ? RESERVATION_API_URL_LIST : RESERVATION_API_URL
      );
      console.log(response.data);
      // update the Reservation Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListReservations(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListReservations(false);
    }
  };

  return { listReservations, isLoadingListReservations };
};
