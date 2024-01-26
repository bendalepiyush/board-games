import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getSocketClient } from "@/js/socket-client";

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

  const login = (token: string, username: string) => {
    setUser({ token, username });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    getSocketClient(token);
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
