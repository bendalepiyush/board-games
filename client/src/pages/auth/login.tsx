import { useEffect, useState } from "react";

import styles from "./style.module.scss";

import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
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

  return (
    <div>
      <div>
        <div className={styles.header}>
          <div className={styles.content}>
            <h1>Login</h1>
            <p>Lorem ipsum dolor summit</p>
            <div className={styles.formcont}>
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
              <button onClick={() => login(email, password)}>Login</button>
            </div>
            <Link href="/auth/register">
              <p className={styles.linktoregister}>
                Don&apos;t have an account? Register
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
