import { useState } from "react";
import { useClientContext } from "./useClientContext";
import axios from "axios";
import { CLIENT_API_URL } from "../../utils/APIS";

export const useUpdateClient = () => {
  const [isLoadingUpdateClient, setIsLoadingUpdateClient] = useState(null);
  const { dispatch } = useClientContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateClient = async (id, values) => {
    setIsLoadingUpdateClient(true);

    try {
      const response = await axios.patch(`${CLIENT_API_URL}/${id}`, values);
      console.log(response);
      // update the Auth Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateClient(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdateClient(false);
    }
  };

  return { updateClient, isLoadingUpdateClient };
};
