import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getSocketClient } from "@/js/socket-client";
import axios from "axios";

type User = {
  token: string | null;
  username: string | null;
};

type AuthContextProps = {
  user: User;
  login: (token: string, username: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    token: null,
    username: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setUser({ token: storedToken, username: storedUsername });
      getSocketClient(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      const { token, username } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setUser({ token, username });
      getSocketClient(token);
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  const logout = () => {
    setUser({ token: null, username: null });
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    getSocketClient().disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
