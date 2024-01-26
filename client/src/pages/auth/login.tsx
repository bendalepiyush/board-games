import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/auth";

type SocketClient = {
  socket: Socket;
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
};

const Login = () => {
  const router = useRouter();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const logUserIn = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      const { token, username } = response.data;

      login(token, username);
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  const logoutUser = () => {
    logout();
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={handleEmailChange}
      />
      <input
        type="text"
        value={password}
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <button onClick={logUserIn}>Login</button>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Login;
