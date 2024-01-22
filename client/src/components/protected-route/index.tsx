import { useAuth } from "@/context/auth";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const { user, isLoading } = useAuth();
  if (isLoading || (!user && window.location.pathname !== "/login")) {
    return <div>LoadingScreen</div>;
  }
  return children;
};
