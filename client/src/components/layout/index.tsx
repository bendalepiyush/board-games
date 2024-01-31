import React, { ReactNode } from "react";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
