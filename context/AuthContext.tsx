import {
  Auth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../utils/firebase_config";

// AuthProvider Props
export interface AuthProviderProps {
  children?: ReactNode;
}

// User context state
export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

// create context UserStateContext using UserContextState
export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
);

// Auth context model
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
}

// create AuthContext
export const AuthContext = createContext<AuthContextModel>(
  {} as AuthContextModel
);

// useAuth
export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

// Auth Provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Login user with email and password
  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout user from app
  function logout() {
    setUser(null);
  }

  // useEffect hooks
  useEffect(() => {
    // function that notifies you if a user is set
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("current user is set", user);
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const values = {
    login,
    logout,
    auth,
    user,
  };

  return (
    <>
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    </>
  );
};
