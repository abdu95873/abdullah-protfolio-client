import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  clearAuthStorage,
  fetchCurrentUser,
  getStoredUser,
  loginUser,
  registerUser,
  saveAuthSession,
} from "../../services/authService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        if (!cancelled && currentUser) {
          setUser(currentUser);
        }
      } catch {
        if (!cancelled) {
          clearAuthStorage();
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const registerUserAccount = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      saveAuthSession(data);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInUser = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      saveAuthSession(data);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(() => {
    clearAuthStorage();
    setUser(null);
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser: registerUserAccount,
    signInUser,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
