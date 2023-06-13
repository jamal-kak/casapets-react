import { useState } from "react";
import { useTarifContext } from "./useTarifContext";
import axios from "axios";
import { TARIFS_API_URL } from "../../utils/APIS";

export const useUpdateTarif = () => {
  const [isLoadingUpdateTarif, setIsLoadingUpdateTarif] = useState(null);
  const { dispatch } = useTarifContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateTarif = async (id, values) => {
    setIsLoadingUpdateTarif(true);

    try {
      const response = await axios.patch(`${TARIFS_API_URL}/${id}`, values);
      console.log(response);
      // update the Tarif Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateTarif(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdateTarif(false);
    }
  };

  return { updateTarif, isLoadingUpdateTarif };
};
