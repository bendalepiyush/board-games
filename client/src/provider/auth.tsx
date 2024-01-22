import React, { useState, useEffect, Children, FC } from "react";
import AuthContext, {
  SignUpParameters,
  SignInParameters,
  VerificationParameter,
  UserParameters,
} from "@/context/auth";
import {
  confirmSignUp,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserParameters | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const { username, userId } = await getCurrentUser();
        setUser({
          username,
          userId,
        });
      } catch (error) {}
    };
    currentUser();

    Hub.listen("auth", (data) => {
      const { payload } = data;

      if (payload.event === "signedOut") {
      }
    });

    setIsLoading(false);
  }, []);

  const login = async ({ username, password }: SignInParameters) => {
    try {
      const res = await signIn({
        username: username,
        password: password,
      });

      console.log(JSON.stringify(res));
    } catch (error) {}
  };

  const register = async ({ username, password, email }: SignUpParameters) => {
    try {
      const { userId } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email: email,
          },
          autoSignIn: true,
        },
      });

      if (userId) {
        setUser({ username, userId });
      }
    } catch (error) {}
  };

  const verify = async ({ username, token }: VerificationParameter) => {
    try {
      const { userId } = await confirmSignUp({
        username,
        confirmationCode: token,
      });

      if (userId) {
        setUser({ username, userId });
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const logout = async () => {
    await signOut();
  };

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
