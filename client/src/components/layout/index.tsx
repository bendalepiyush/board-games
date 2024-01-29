import AppHeader from "./app-header";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
};

export default AppLayout;
