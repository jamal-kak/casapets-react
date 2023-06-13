import { useState } from "react";
import { useServiceContext } from "./useServiceContext";
import axios from "axios";
import { SERVICE_API_URL } from "../../utils/APIS";

export const useAddService = () => {
  const [isLoadingAddService, setIsLoadingAddService] = useState(null);
  const { dispatch } = useServiceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addService = async (values) => {
    setIsLoadingAddService(true);

    try {
      const response = await axios.post(SERVICE_API_URL, values);
      console.log(response.data);
      // update the Service Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddService(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoadingAddService(false);
    }
  };

  return { addService, isLoadingAddService };
};
