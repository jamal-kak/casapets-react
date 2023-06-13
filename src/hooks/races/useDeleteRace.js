import { useState } from "react";
import { useRaceContext } from "./useRaceContext";
import axios from "axios";
import { RACES_API_URL } from "../../utils/APIS";

export const useDeleteRace = () => {
  const [isLoadingDeleteRace, setIsLoadingDeleteRace] = useState(null);
  const { dispatch } = useRaceContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const deleteRace = async (id) => {
    setIsLoadingDeleteRace(true);

    try {
      const response = await axios.delete(`${RACES_API_URL}/${id}`);
      console.log(response.data);
      // update the Box Context
      await dispatch({ type: "DELETE", payload: response.data });
      setIsLoadingDeleteRace(false);
    } catch (error) {
      await dispatch({ type: "DELETE", payload: error.response.data });
      setIsLoadingDeleteRace(false);
    }
  };

  return { deleteRace, isLoadingDeleteRace };
};
