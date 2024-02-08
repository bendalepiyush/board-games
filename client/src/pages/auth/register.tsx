import { useEffect, useState } from "react";

import styles from "./style.module.scss";

import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/monopoly");
    }
  }, [router]);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

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
            <h1>Register</h1>
            <p>Lorem ipsum dolor summit</p>
            <div className={styles.formcont}>
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={handleUserNameChange}
              />
              <input
                type="email"
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
              <button>Login</button>
            </div>
            <Link href="/auth/login">
              <p className={styles.linktoregister}>Have an account? Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
