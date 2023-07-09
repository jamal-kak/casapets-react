import { DemandeAdoptionContext } from "../../context/demandeAdoptionContext";
import { useContext } from "react";

export const useDemandeAdoptionContext = () => {
  const context = useContext(DemandeAdoptionContext);

  if (!context) {
    throw Error(
      "useDemandeAdoptionContext must be used inside an DemandeAdoptionContextProvider"
    );
  }

  return context;
};
