import { useState } from "react";
import { useBoxContext } from "./useBoxContext";
import axios from "axios";
import { BOX_API_URL } from "../../utils/APIS";

export const useUpdateBox = () => {
  const [isLoadingUpdateBox, setIsLoadingUpdateBox] = useState(null);
  const { dispatch } = useBoxContext();
  const { access_token } = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  const updateBox = async (id, values) => {
    setIsLoadingUpdateBox(true);

    try {
      const response = await axios.patch(`${BOX_API_URL}/${id}`, values);
      console.log(response);
      // update the Box Context
      await dispatch({ type: "MODIFIER", payload: response.data });
      setIsLoadingUpdateBox(false);
    } catch (error) {
      await dispatch({ type: "MODIFIER", payload: error.response.data });
      setIsLoadingUpdateBox(false);
    }
  };

  return { updateBox, isLoadingUpdateBox };
};
