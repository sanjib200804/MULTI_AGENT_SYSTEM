/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axiosIntences";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const navigate = useNavigate();

  const refetchUser = async () => {
    try {
      const response = await api.get("/api/auth/me");
      setUser(response.data);
      return response.data;
    } catch {
      setUser(null);
      return null;
    }
  };

  // Verify existing session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        await refetchUser();
      } catch {
        console.log("No active Agentra session found on mount.");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      // 1. Authenticate with Google via Firebase Client Popup
      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;

      // 2. Send user details to backend gateway
      const response = await api.post("/api/auth/login", {
        fullname: firebaseUser.displayName || "Agentra User",
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || "",
        firebase_id: firebaseUser.uid,
      });

      setUser(response.data.user || response.data);
      setIsAuthModalOpen(false);
      setIsPricingModalOpen(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);
      setAuthError("Google Sign-In failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        authError,
        setAuthError,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isPricingModalOpen,
        setIsPricingModalOpen,
        loginWithGoogle,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider as AuthContextProvider };

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthContext() {
  return useContext(AuthContext);
}
