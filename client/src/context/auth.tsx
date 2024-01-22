import { createContext, useContext } from "react";

export type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

export type UserParameters = {
  username: string;
  userId: string;
};

export type SignInParameters = {
  username: string;
  password: string;
};

export type VerificationParameter = {
  username: string;
  token: string;
};

interface AuthContextType {
  user: UserParameters | null;
  login: (credentials: SignInParameters) => void;
  register: (credentials: SignUpParameters) => void;
  logout: () => void;
  verify: (credentials: VerificationParameter) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
