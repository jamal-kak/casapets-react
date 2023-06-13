import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";
import { VET_API_URL } from "../../utils/APIS";

export const useAddVet = () => {
  const [isLoadingAddVet, setIsLoadingAddVet] = useState(null);
  const { dispatch } = useVetContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addVet = async (values) => {
    setIsLoadingAddVet(true);

    try {
      const response = await axios.post(VET_API_URL, values);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddVet(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoadingAddVet(false);
    }
  };

  return { addVet, isLoadingAddVet };
};
