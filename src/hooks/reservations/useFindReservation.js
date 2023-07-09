import { useState } from "react";
import { useReservationContext } from "./useReservationContext";
import axios from "axios";
import { RESERVATION_LIST } from "../../utils/APIS";

export const useFindReservation = () => {
  const [isLoadingFindReservation, setIsLoadingFindReservation] =
    useState(null);
  const { dispatch } = useReservationContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const findReservation = async (id) => {
    setIsLoadingFindReservation(true);

    try {
      const response = await axios.get(`${RESERVATION_LIST}/${id}`);
      console.log(response.data);
      // update the Reservation Context
      await dispatch({ type: "DETAIL", payload: response.data });
      setIsLoadingFindReservation(false);
    } catch (error) {
      await dispatch({ type: "DETAIL", payload: error.response.data });
      setIsLoadingFindReservation(false);
    }
  };

  return { findReservation, isLoadingFindReservation };
};
