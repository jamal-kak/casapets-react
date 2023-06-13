import { useState } from "react";
import { useServiceContext } from "./useServiceContext";
import axios from "axios";
import { SERVICE_API_URL } from "../../utils/APIS";

export const useUpdateService = () => {
  const [isLoadingUpdateService, setIsLoadingUpdateService] = useState(null);
  const { dispatch } = useServiceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateService = async (id, values) => {
    setIsLoadingUpdateService(true);

    try {
      const response = await axios.patch(`${SERVICE_API_URL}/${id}`, values);
      console.log(response);
      // update the Service Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateService(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdateService(false);
    }
  };

  return { updateService, isLoadingUpdateService };
};
