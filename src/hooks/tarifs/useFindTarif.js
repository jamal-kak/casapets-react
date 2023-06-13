import { useState } from "react";
import { useTarifContext } from "./useTarifContext";
import axios from "axios";
import { TARIFS_API_URL } from "../../utils/APIS";

export const useFindTarif = () => {
  const [isLoadingFindTarif, setIsLoadingFindTarif] = useState(null);
  const { dispatch } = useTarifContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const findTarif = async (id) => {
    setIsLoadingFindTarif(true);

    try {
      const response = await axios.get(`${TARIFS_API_URL}/${id}`);
      console.log(response.data);
      // update the Tarif Context
      await dispatch({ type: "DETAIL", payload: response.data });
      setIsLoadingFindTarif(false);
    } catch (error) {
      await dispatch({ type: "DETAIL", payload: error.response.data });
      setIsLoadingFindTarif(false);
    }
  };

  return { findTarif, isLoadingFindTarif };
};
