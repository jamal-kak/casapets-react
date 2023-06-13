import { useState } from "react";
import { useClientContext } from "./useClientContext";
import axios from "axios";
import { CLIENT_API_URL } from "../../utils/APIS";

export const useAddClient = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useClientContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addClient = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.post(CLIENT_API_URL, values);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoading(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoading(false);
    }
  };

  return { addClient, isLoading };
};
