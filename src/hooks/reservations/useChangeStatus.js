import { useState } from "react";
import { useReservationContext } from "./useReservationContext";
import axios from "axios";
import { STATUS_RES_API_URL } from "../../utils/APIS";

export const useChangeStatus = () => {
  const [isLoadingChangeStatus, setIsLoadingChangeStatus] = useState(null);
  const { dispatch } = useReservationContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const changeStatus = async (id, status) => {
    setIsLoadingChangeStatus(true);

    try {
      const response = await axios.post(
        `${STATUS_RES_API_URL}/${id}/${status}`
      );
      console.log(response.data);
      await dispatch({ type: "STATUS", payload: response.data });
      setIsLoadingChangeStatus(false);
    } catch (error) {
      await dispatch({ type: "STATUS", payload: error.response.data });
      console.log(error.response.data);
      setIsLoadingChangeStatus(false);
    }
  };
  return { changeStatus, isLoadingChangeStatus };
};
