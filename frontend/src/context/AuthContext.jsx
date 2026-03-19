import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout, clearError } from "../store/userSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((s) => s.user);

  const handleLogin = (credentials) => dispatch(login(credentials));
  const handleRegister = (userData) => dispatch(register(userData));
  const handleLogout = () => dispatch(logout());
  const handleClearError = () => dispatch(clearError());

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        clearError: handleClearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
