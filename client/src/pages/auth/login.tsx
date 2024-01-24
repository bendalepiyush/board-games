import { useAuth } from "@/context/auth";

const Login = () => {
  const { user, login } = useAuth();
  return (
    <div>
      <button
        onClick={async () => {
          await login({
            username: "piyush",
            password: "Piyush@123",
          });
        }}
      >
        Button
      </button>
    </div>
  );
};

export default Login;
