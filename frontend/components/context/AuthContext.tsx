"use client";
import { User } from "@/lib/types/userClientTypes";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  setUserMain: (val: User) => void;
  clearOutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function setUserMain(user: User) {
    setUser(user);
  }

  function clearOutUser() {
    setUser(null);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_DETAILS");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    } else {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    setUserMain,
    clearOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
