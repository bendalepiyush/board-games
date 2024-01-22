import { useAuth } from "@/context/auth";

const Login = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <button
        onClick={async () => {
          if (user) {
            await logout();
          } else {
            await login({
              username: "piyush",
              password: "Piyush@123",
            });
          }
        }}
      >
        Button
      </button>
    </div>
  );
};

export default Login;
