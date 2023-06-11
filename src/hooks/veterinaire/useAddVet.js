import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";

export const useAddVet = () => {
  const [isLoadingAddVet, setIsLoadingAddVet] = useState(null);
  const { dispatch } = useVetContext();
  const Url = "http://127.0.0.1:8000/api";
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addVet = async (values) => {
    setIsLoadingAddVet(true);

    try {
      const response = await axios.post(`${Url}/veterinaires`, values);
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
