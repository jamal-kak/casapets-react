import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";
import { VET_API_URL } from "../../utils/APIS";

export const useDeleteVet = () => {
  const [isLoadingDeleteVet, setIsLoadingDeleteVet] = useState(null);
  const { dispatch } = useVetContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteVet = async (id) => {
    setIsLoadingDeleteVet(true);

    try {
      const response = await axios.delete(`${VET_API_URL}/${id}`);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteVet(false);
    } catch (error) {
      setIsLoadingDeleteVet(false);
      console.log(error.response.data);
      await dispatch({ type: "DELETE", payload: error.response.data });
    }
  };

  return { deleteVet, isLoadingDeleteVet };
};
