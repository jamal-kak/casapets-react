import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";
import { VET_API_URL } from "../../utils/APIS";

export const useListVet = () => {
  const [errorListVet, setErrorListVet] = useState(null);
  const [isLoadingListVet, setIsLoadingListVet] = useState(null);
  const { dispatch } = useVetContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listVet = async () => {
    setIsLoadingListVet(true);
    setErrorListVet(null);

    try {
      const response = await axios.get(VET_API_URL);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListVet(false);
    } catch (error) {
      setIsLoadingListVet(false);
      setErrorListVet(error);
    }
  };

  return { listVet, isLoadingListVet, errorListVet };
};
