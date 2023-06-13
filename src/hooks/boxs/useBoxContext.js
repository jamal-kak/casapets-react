import { BoxContext } from "../../context/boxContext";
import { useContext } from "react";

export const useBoxContext = () => {
  const context = useContext(BoxContext);

  if (!context) {
    throw Error("useBoxContext must be used inside an BoxContextProvider");
  }

  return context;
};
