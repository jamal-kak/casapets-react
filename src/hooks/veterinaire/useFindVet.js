import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";
import { VET_API_URL } from "../../utils/APIS";

export const useFindVet = () => {
  const [isLoadingFindVet, setIsLoadingFindVet] = useState(null);
  const { dispatch } = useVetContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const findVet = async (id) => {
    setIsLoadingFindVet(true);

    try {
      const response = await axios.get(`${VET_API_URL}/${id}`);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingFindVet(false);
    } catch (error) {
      setIsLoadingFindVet(false);
      await dispatch({ type: "AFFICHER", payload: error.response.data });
    }
  };

  return { findVet, isLoadingFindVet };
};
