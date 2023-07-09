import { useState } from "react";
import { useDemandeAdoptionContext } from "./useDemandeAdoptionContext";
import axios from "axios";
import { DEMANDES_ADOPTION } from "../../utils/APIS";

export const useDeleteDemande = () => {
  const [isLoadingDeleteDemande, setIsLoadingDeleteDemande] = useState(null);
  const { dispatch } = useDemandeAdoptionContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteDemande = async (id) => {
    setIsLoadingDeleteDemande(true);

    try {
      const response = await axios.delete(`${DEMANDES_ADOPTION}/${id}`);
      console.log(response.data);
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteDemande(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteDemande(false);
    }
  };

  return { deleteDemande, isLoadingDeleteDemande };
};
