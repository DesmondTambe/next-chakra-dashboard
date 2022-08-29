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
    console.log("Auth Context");
    // function that notifies you if a user is set
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
// type authContextType = {
//   user: boolean;
//   email: string;
//   password: string;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => void;
// };

// const authContextDefaultValues: authContextType = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   // login: (email, password) => Promise<UserCredential>,
//   login: () => {},
//   logout: () => {},
// };

// const AuthContext = createContext<authContextType>(authContextDefaultValues);

// export function useAuth() {
//   return useContext(AuthContext);
// }

// type Props = {
//   children: ReactNode;
// };

// export function AuthProvider({ children }: Props) {
//   const [user, setUser] = useState<boolean>(null);
//   const email = useState<string>("");
//   const password = useState<string>("");

//   const login = (email: string, password: string) => {
//     setUser(true);
//     signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     // return signIn
//     setUser(false);
//   };

//   const value = {
//     user,
//     email,
//     password,
//     login,
//     logout,
//   };

//   return (
//     <>
//       <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     </>
//   );
// }
