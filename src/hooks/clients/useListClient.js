import { useState } from "react";
import { useClientContext } from "./useClientContext";
import axios from "axios";
import { CLIENT_API_URL } from "../../utils/APIS";

export const useListClient = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useClientContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listClient = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(CLIENT_API_URL);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoading(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoading(false);
    }
  };

  return { listClient, isLoading };
};
