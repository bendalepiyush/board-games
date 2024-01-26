import { useAuth } from "@/context/auth";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const { user } = useAuth();
  if (!user && window.location.pathname !== "/login") {
    return <div>LoadingScreen</div>;
  }
  return children;
};
