import { useState } from "react";
import { useRaceContext } from "./useRaceContext";
import axios from "axios";
import { RACES_API_URL } from "../../utils/APIS";

export const useListRaces = () => {
  const [isLoadingListRaces, setIsLoadingListRaces] = useState(null);
  const { dispatch } = useRaceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const listRaces = async () => {
    setIsLoadingListRaces(true);

    try {
      const response = await axios.get(RACES_API_URL);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "AFFICHER", payload: response.data });
      setIsLoadingListRaces(false);
    } catch (error) {
      await dispatch({ type: "AFFICHER", payload: error.response.data });
      setIsLoadingListRaces(false);
    }
  };

  return { listRaces, isLoadingListRaces };
};
