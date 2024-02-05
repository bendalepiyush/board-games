import { useAuth } from "@/context/auth";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const Register = () => {
  const { user } = useAuth();
  return (
    <div>
      <button>Button</button>
    </div>
  );
};

export default Register;
