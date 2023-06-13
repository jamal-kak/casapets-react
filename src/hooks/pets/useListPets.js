import { useState } from "react";
import { usePetsContext } from "./usePetsContext";
import axios from "axios";
import { PETS_API_URL } from "../../utils/APIS";

export const useListPets = () => {
  const [isLoadingListPets, setIsLoadingListPets] = useState(null);
  const { dispatch } = usePetsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listPets = async () => {
    setIsLoadingListPets(true);

    try {
      const response = await axios.get(PETS_API_URL);
      console.log(response.data);
      // update the Pets Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListPets(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListPets(false);
    }
  };

  return { listPets, isLoadingListPets };
};
