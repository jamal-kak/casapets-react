import { useState } from "react";
import { useRaceContext } from "./useRaceContext";
import axios from "axios";
import { RACES_API_URL } from "../../utils/APIS";

export const useUpdateRace = () => {
  const [isLoadingUpdateRace, setIsLoadingUpdateRace] = useState(null);
  const { dispatch } = useRaceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateRace = async (id, values) => {
    setIsLoadingUpdateRace(true);

    try {
      const response = await axios.patch(`${RACES_API_URL}/${id}`, values);
      console.log(response);
      // update the Race Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateRace(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdateRace(false);
    }
  };

  return { updateRace, isLoadingUpdateRace };
};
