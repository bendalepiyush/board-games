import { useEffect, useState } from "react";

import Header from "@/components/layout/header";
import styles from "./style.module.scss";

import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";

const Login = () => {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/monopoly");
    }
  }, [router]);

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

      const redirectUrl = router.query.redirect || "/monopoly";
      console.log("before login");
      login(token, username);
      localStorage.setItem("token", token);
      console.log("after login");

      router.push(redirectUrl.toString());
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.header}>
          <div className={styles.content}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
