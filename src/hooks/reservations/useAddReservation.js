import { useState } from "react";
import { useReservationContext } from "./useReservationContext";
import axios from "axios";
import { RESERVATION_API_URL } from "../../utils/APIS";

export const useAddReservation = () => {
  const [isLoadingAddReservation, setIsLoadingAddReservation] = useState(null);
  const { dispatch } = useReservationContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addReservation = async (values) => {
    setIsLoadingAddReservation(true);

    try {
      const response = await axios.post(RESERVATION_API_URL, values);
      console.log(response.data);
      // update the Reservation Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddReservation(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoadingAddReservation(false);
    }
  };

  return { addReservation, isLoadingAddReservation };
};
