import { useState } from "react";
import { useDemandeAdoptionContext } from "./useDemandeAdoptionContext";
import axios from "axios";
import { CHANGE_STATUS } from "../../utils/APIS";

export const useChangeStatus = () => {
  const [isLoadingChangeStatus, setIsLoadingChangeStatus] = useState(null);
  const { dispatch } = useDemandeAdoptionContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const changeStatus = async (id, status) => {
    setIsLoadingChangeStatus(true);

    try {
      const response = await axios.post(`${CHANGE_STATUS}/${id}/${status}`);
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
