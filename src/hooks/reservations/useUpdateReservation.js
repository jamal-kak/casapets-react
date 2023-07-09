import { useState } from "react";
import { useReservationContext } from "./useReservationContext";
import axios from "axios";
import { RESERVATION_LIST } from "../../utils/APIS";

export const useUpdateReservation = () => {
  const [isLoadingUpdateReservation, setIsLoadingUpdateReservation] =
    useState(null);
  const { dispatch } = useReservationContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateReservation = async (id, values) => {
    setIsLoadingUpdateReservation(true);

    try {
      const response = await axios.patch(`${RESERVATION_LIST}/${id}`, values);
      console.log(response);
      // update the Reservation Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateReservation(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdateReservation(false);
    }
  };

  return { updateReservation, isLoadingUpdateReservation };
};
