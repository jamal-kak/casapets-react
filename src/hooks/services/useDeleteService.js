import { useState } from "react";
import { useServiceContext } from "./useServiceContext";
import axios from "axios";
import { SERVICE_API_URL } from "../../utils/APIS";

export const useDeleteService = () => {
  const [isLoadingDeleteService, setIsLoadingDeleteService] = useState(null);
  const { dispatch } = useServiceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteService = async (id) => {
    setIsLoadingDeleteService(true);

    try {
      const response = await axios.delete(`${SERVICE_API_URL}/${id}`);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteService(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteService(false);
    }
  };

  return { deleteService, isLoadingDeleteService };
};
