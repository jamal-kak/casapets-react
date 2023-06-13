import { useState } from "react";
import { useVetContext } from "./useVetContext";
import axios from "axios";
import { VET_USER_API_URL } from "../../utils/APIS";

export const useSetAsUser = () => {
  const [isLoadingSetAsUser, setIsLoadingSetAsUser] = useState(null);
  const { dispatch } = useVetContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const setAsUser = async (id) => {
    setIsLoadingSetAsUser(true);

    try {
      const response = await axios.post(`${VET_USER_API_URL}/${id}`);
      console.log(response.data);
      // update the Vet Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingSetAsUser(false);
    } catch (error) {
      setIsLoadingSetAsUser(false);
      console.log(error.response.data);
      await dispatch({ type: "MODIFIER", payload: error.response.data });
    }
  };

  return { setAsUser, isLoadingSetAsUser };
};
