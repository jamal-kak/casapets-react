import { useState } from "react";
import { useServiceContext } from "./useServiceContext";
import axios from "axios";
import { SERVICE_API_URL } from "../../utils/APIS";

export const useFindService = () => {
  const [isLoadingFindService, setIsLoadingFindService] = useState(null);
  const { dispatch } = useServiceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const findService = async (id) => {
    setIsLoadingFindService(true);

    try {
      const response = await axios.get(`${SERVICE_API_URL}/${id}`);
      console.log(response.data);
      // update the Service Context
      await dispatch({ type: "DETAIL", payload: response.data });
      setIsLoadingFindService(false);
    } catch (error) {
      await dispatch({ type: "DETAIL", payload: error.response.data });
      setIsLoadingFindService(false);
    }
  };

  return { findService, isLoadingFindService };
};
