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
    const navigate = useNavigate();

    // Verify existing session on mount
    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await api.get("/api/auth/me");
                setUser(response.data);
            } catch {
                console.log("No active Agentra session found on mount.");
                setUser(null);
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

            // 2. Retrieve Firebase ID Token
            const idToken = await firebaseUser.getIdToken();

            // 3. Send ID Token securely to backend gateway
            const response = await api.post("/api/auth/login", { id_token: idToken });

            // 4. Update local user state with backend response (cookies are automatically set)
            setUser(response.data);
            setIsAuthModalOpen(false);
            navigate("/dashboard");
        } catch (error) {
            console.error("Sign-In Error:", error);
            if (error.code === "auth/popup-closed-by-user") {
                setAuthError("Google sign-in was cancelled.");
            } else {
                setAuthError("Unable to sign in with Google. Please try again.");
            }
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/auth/logout");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
            // Fallback: clear user state anyway
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
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Support both naming styles requested by the user
export { AuthProvider as AuthContextProvider };

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthContext() {
    return useContext(AuthContext);
}
