import { useState } from "react";
import { useRaceContext } from "./useRaceContext";
import axios from "axios";
import { RACES_API_URL } from "../../utils/APIS";

export const useAddRace = () => {
  const [isLoadingAddRace, setIsLoadingAddRace] = useState(null);
  const { dispatch } = useRaceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const addRace = async (values) => {
    setIsLoadingAddRace(true);

    try {
      const response = await axios.post(RACES_API_URL, values);
      console.log(response.data);
      // update the Race Context
      await dispatch({ type: "AJOUTER", payload: response.data });
      setIsLoadingAddRace(false);
    } catch (error) {
      await dispatch({ type: "AJOUTER", payload: error.response.data });
      setIsLoadingAddRace(false);
    }
  };

  return { addRace, isLoadingAddRace };
};
