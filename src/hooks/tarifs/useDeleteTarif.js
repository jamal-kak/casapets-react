import { useState } from "react";
import { useTarifContext } from "./useTarifContext";
import axios from "axios";
import { TARIFS_API_URL } from "../../utils/APIS";

export const useDeleteTarif = () => {
  const [isLoadingDeleteTarif, setIsLoadingDeleteTarif] = useState(null);
  const { dispatch } = useTarifContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteTarif = async (id) => {
    setIsLoadingDeleteTarif(true);

    try {
      const response = await axios.delete(`${TARIFS_API_URL}/${id}`);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteTarif(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteTarif(false);
    }
  };

  return { deleteTarif, isLoadingDeleteTarif };
};
