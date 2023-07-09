import { AdoptionsContext } from "../../context/adoptionsContext";
import { useContext } from "react";

export const useAdoptionsContext = () => {
  const context = useContext(AdoptionsContext);

  if (!context) {
    throw Error(
      "useAdoptionsContext must be used inside an AdoptionsContextProvider"
    );
  }

  return context;
};
