import { PetsContext } from "../../context/petsContext";
import { useContext } from "react";

export const usePetsContext = () => {
  const context = useContext(PetsContext);

  if (!context) {
    throw Error("usePetsContext must be used inside an PetsContextProvider");
  }

  return context;
};
