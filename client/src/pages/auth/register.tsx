import { useAuth } from "@/context/auth";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const Register = () => {
  const { user, register } = useAuth();
  return (
    <div>
      <button
        onClick={() =>
          register({
            username: "piyush",
            password: "Piyush@123",
            email: "bendalepiyush73@gmail.com",
          })
        }
      >
        Button
      </button>
    </div>
  );
};

export default Register;
