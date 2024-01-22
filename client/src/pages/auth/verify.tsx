import { useAuth } from "@/context/auth";
import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";

const Verify = () => {
  const { user, verify } = useAuth();

  return (
    <div>
      <button
        onClick={() =>
          verify({
            username: "piyush",
            token: "437099",
          })
        }
      >
        Button
      </button>
    </div>
  );
};

export default Verify;
