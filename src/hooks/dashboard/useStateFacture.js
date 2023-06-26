import { useState } from "react";
import { useDashContext } from "./useDashContext";
import axios from "axios";
import { FACTURE_LIST } from "../../utils/APIS";

export const useStateFacture = () => {
  const [isLoadingStatusPaye, setIsLoadingStatusPaye] = useState(null);
  const { dispatch } = useDashContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const changeStateFacture = async (id) => {
    setIsLoadingStatusPaye(true);

    try {
      const response = await axios.post(`${FACTURE_LIST}/${id}`);
      console.log(response.data);
      await dispatch({ type: "ETAT_FACTURE", payload: response.data });

      setIsLoadingStatusPaye(false);
    } catch (error) {
      setIsLoadingStatusPaye(false);
      console.log(error.response.data);
      await dispatch({ type: "ETAT_FACTURE", payload: error.response.data });
    }
  };

  return { changeStateFacture, isLoadingStatusPaye };
};
