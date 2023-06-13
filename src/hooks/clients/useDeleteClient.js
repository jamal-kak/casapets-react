import { useState } from "react";
import { useClientContext } from "./useClientContext";
import axios from "axios";
import { CLIENT_API_URL } from "../../utils/APIS";

export const useDeleteClient = () => {
  const [isLoadingDeleteClient, setIsLoadingDeleteClient] = useState(null);
  const { dispatch } = useClientContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteClient = async (id) => {
    setIsLoadingDeleteClient(true);

    try {
      const response = await axios.delete(`${CLIENT_API_URL}/${id}`);
      console.log(response.data);
      // update the Auth Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteClient(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteClient(false);
    }
  };

  return { deleteClient, isLoadingDeleteClient };
};
