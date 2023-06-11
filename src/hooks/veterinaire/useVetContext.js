import { VetContext } from "../../context/vetContext";
import { useContext } from "react";

export const useVetContext = () => {
  const context = useContext(VetContext);

  if (!context) {
    throw Error("useVetContext must be used inside an VetContextProvider");
  }

  return context;
};
