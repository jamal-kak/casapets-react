import { useState } from "react";
import { usePetsContext } from "./usePetsContext";
import axios from "axios";
import { PETS_API_URL } from "../../utils/APIS";

export const useAddPets = () => {
  const [isLoadingAddPets, setIsLoadingAddPets] = useState(null);
  const { dispatch } = usePetsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addPets = async (values) => {
    setIsLoadingAddPets(true);

    try {
      const response = await axios.post(PETS_API_URL, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      // update the Pets Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddPets(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoadingAddPets(false);
    }
  };

  return { addPets, isLoadingAddPets };
};
