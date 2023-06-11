import { AuthContextProvider } from "./authContext";
import { UserContextProvider } from "./userContext";
import { ClientContextProvider } from "./clientContext";
import { PetsContextProvider } from "./petsContext";
import { VetContextProvider } from "./vetContext";

import { AppContextCombiner } from "./AppContextCombiner";

const providers = [
  AuthContextProvider,
  UserContextProvider,
  ClientContextProvider,
  PetsContextProvider,
  VetContextProvider,
];

export const AppContextProvider = AppContextCombiner(...providers);
