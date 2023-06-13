import { useState } from "react";
import { useServiceContext } from "./useServiceContext";
import axios from "axios";
import { SERVICE_API_URL, SERVICE_API_URL_LIST } from "../../utils/APIS";

export const useListServices = () => {
  const [isLoadingListServices, setIsLoadingListServices] = useState(null);
  const { dispatch } = useServiceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listServices = async (minimal = false) => {
    setIsLoadingListServices(true);

    try {
      const response = await axios.get(
        minimal ? SERVICE_API_URL_LIST : SERVICE_API_URL
      );
      console.log(response.data);
      // update the Service Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListServices(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListServices(false);
    }
  };

  return { listServices, isLoadingListServices };
};
