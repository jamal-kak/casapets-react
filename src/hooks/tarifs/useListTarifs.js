import { useState } from "react";
import { useTarifContext } from "./useTarifContext";
import axios from "axios";
import { TARIFS_API_URL } from "../../utils/APIS";

export const useListTarifs = () => {
  const [isLoadingListTarifs, setIsLoadingListTarifs] = useState(null);
  const { dispatch } = useTarifContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listTarifs = async () => {
    setIsLoadingListTarifs(true);

    try {
      const response = await axios.get(TARIFS_API_URL);
      console.log(response.data);
      // update the Tarif Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListTarifs(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListTarifs(false);
    }
  };

  return { listTarifs, isLoadingListTarifs };
};
