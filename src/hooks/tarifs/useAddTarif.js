import { useState } from "react";
import { useTarifContext } from "./useTarifContext";
import axios from "axios";
import { TARIFS_API_URL } from "../../utils/APIS";

export const useAddTarif = () => {
  const [isLoadingAddTarif, setIsLoadingAddTarif] = useState(null);
  const { dispatch } = useTarifContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addTarif = async (values) => {
    setIsLoadingAddTarif(true);

    try {
      const response = await axios.post(TARIFS_API_URL, values);
      console.log(response.data);
      // update the Tarif Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddTarif(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      console.log(error.response.data);
      setIsLoadingAddTarif(false);
    }
  };

  return { addTarif, isLoadingAddTarif };
};
