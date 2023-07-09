import { useState } from "react";
import { useDemandeAdoptionContext } from "./useDemandeAdoptionContext";
import axios from "axios";
import { DEMANDES_ADOPTION } from "../../utils/APIS";

export const useListDemandes = () => {
  const [isLoadingListDemandes, setIsLoadingListDemandes] = useState(null);
  const { dispatch } = useDemandeAdoptionContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listDemandes = async () => {
    setIsLoadingListDemandes(true);

    try {
      const response = await axios.get(DEMANDES_ADOPTION);
      console.log(response.data);
      await dispatch({ type: "AFFICHER", payload: response.data });
      setTimeout(() => {
        dispatch({ type: "STATUS", payload: null });
        dispatch({ type: "DELETE", payload: null });
      }, 5000);
      setIsLoadingListDemandes(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListDemandes(false);
    }
  };

  return { listDemandes, isLoadingListDemandes };
};
