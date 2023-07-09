import { useState } from "react";
import { useAdoptionsContext } from "./useAdoptionsContext";
import axios from "axios";
import { ADOPTIONS_LIST } from "../../utils/APIS";

export const useListAdoptions = () => {
  const [isLoadingListAdoptions, setIsLoadingListAdoptions] = useState(null);
  const { dispatch } = useAdoptionsContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listAdoptions = async () => {
    setIsLoadingListAdoptions(true);

    try {
      const response = await axios.get(ADOPTIONS_LIST);
      console.log(response.data);
      await dispatch({ type: "AFFICHER", payload: response.data });
      setTimeout(() => {
        dispatch({ type: "AJOUTER", payload: null });
        dispatch({ type: "MODIFIER", payload: null });
        dispatch({ type: "DELETE", payload: null });
      }, 5000);
      setIsLoadingListAdoptions(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListAdoptions(false);
    }
  };

  return { listAdoptions, isLoadingListAdoptions };
};
