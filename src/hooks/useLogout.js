import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from localstorage
    localStorage.removeItem("user");

    // Dispatch logout Action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
