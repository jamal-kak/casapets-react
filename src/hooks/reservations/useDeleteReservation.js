import { useState } from "react";
import { useReservationContext } from "./useReservationContext";
import axios from "axios";
import { RESERVATION_LIST } from "../../utils/APIS";

export const useDeleteReservation = () => {
  const [isLoadingDeleteReservation, setIsLoadingDeleteReservation] =
    useState(null);
  const { dispatch } = useReservationContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteReservation = async (id) => {
    setIsLoadingDeleteReservation(true);

    try {
      const response = await axios.delete(`${RESERVATION_LIST}/${id}`);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteReservation(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteReservation(false);
    }
  };

  return { deleteReservation, isLoadingDeleteReservation };
};
