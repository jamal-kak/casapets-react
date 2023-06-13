import { TarifContext } from "../../context/tarifContext";
import { useContext } from "react";

export const useTarifContext = () => {
  const context = useContext(TarifContext);

  if (!context) {
    throw Error("useTarifContext must be used inside an TarifContextProvider");
  }

  return context;
};
