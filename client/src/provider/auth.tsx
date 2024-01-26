import React, { useState, useEffect, Children, FC } from "react";
import AuthContext, {
  SignUpParameters,
  SignInParameters,
  VerificationParameter,
  UserParameters,
} from "@/context/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserParameters | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = async () => {
      try {
      } catch (error) {}
    };
    currentUser();

    setIsLoading(false);
  }, []);

  const login = async ({ username, password }: SignInParameters) => {};

  const register = async ({
    username,
    password,
    email,
  }: SignUpParameters) => {};

  const verify = async ({ username, token }: VerificationParameter) => {};

  const logout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: login,
        register: register,
        verify: verify,
        logout: logout,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
